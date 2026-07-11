// ─── Shared API configuration ──────────────────────────────────────────
const API_BASE = "http://localhost:5076/api";

// ─── Generic response wrapper matching BE's ApiResponse<T> ─────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ─── /api/Topics ───────────────────────────────────────────────────────
export interface TopicDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl: string;
  category: string;
  createdAt: string;
}

export interface TopicDetailDto extends TopicDto {
  content: string;
  author: string;
}

// ─── /api/Homepage ─────────────────────────────────────────────────────
export interface HeroSectionDto {
  title: string;
  description: string;
  imageUrl: string;
}

export interface TimelineItemDto {
  year: string;
  event: string;
}

export interface QuoteDto {
  text: string;
  author: string;
}

export interface HomepageDataDto {
  hero: HeroSectionDto;
  featuredTopics: TopicDto[];
  timeline: TimelineItemDto[];
  quotes: QuoteDto[];
}

// ─── /api/Ranking ──────────────────────────────────────────────────────
export interface RankingDto {
  rank: number;
  name: string;
  avatarUrl: string;
  totalScore: number;
}

// ─── /api/Quiz ─────────────────────────────────────────────────────────
export interface QuizQuestionDto {
  id: number;
  topicId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedAnswer: string;
}

export interface QuizSubmitRequest {
  answers: QuizAnswer[];
}

export interface QuizResultDto {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

// ─── /api/Chatbot/ask ──────────────────────────────────────────────────
export interface ChatbotRequest {
  sessionId: string;
  message: string;
}

export interface ChatbotResponse {
  sessionId: string;
  answer: string;
}

export async function fetchCategories(): Promise<string[]> {
  return fetchApi<string[]>("/Topics/categories");
}

export async function createTopic(topic: Partial<TopicDto>): Promise<TopicDetailDto> {
  return fetchApi<TopicDetailDto>("/Topics", {
    method: "POST",
    body: JSON.stringify(topic),
  });
}

// ─── /api/Search ───────────────────────────────────────────────────────
export interface SearchResult {
  topics: TopicDto[];
  quiz: QuizQuestionDto[];
}

// ─── /api/Auth ─────────────────────────────────────────────────────────
export interface UserDto {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  totalScore: number;
  role: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}

// ─── Auth token management ─────────────────────────────────────────────
let authToken: string | null = null;
let currentUser: UserDto | null = null;

export function setAuth(token: string, user: UserDto) {
  authToken = token;
  currentUser = user;
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function loadAuth(): { token: string; user: UserDto } | null {
  const token = localStorage.getItem("auth_token");
  const userStr = localStorage.getItem("auth_user");
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr) as UserDto;
      authToken = token;
      currentUser = user;
      return { token, user };
    } catch { /* ignore */ }
  }
  return null;
}

export function clearAuth() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export function getAuthToken() { return authToken; }
export function getCurrentUser() { return currentUser; }

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...authHeaders(), ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || `API error: ${res.status}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export async function fetchUsers(): Promise<UserDto[]> {
  return fetchApi<UserDto[]>("/Users");
}

// ─── Fetch helpers ─────────────────────────────────────────────────────

// POST /api/Auth/google
export async function loginWithGoogle(idToken: string): Promise<AuthResponseDto> {
  const res = await fetch(`${API_BASE}/Auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || `Auth error: ${res.status}`);
  }
  const json: ApiResponse<AuthResponseDto> = await res.json();
  if (json.data) {
    setAuth(json.data.token, json.data.user);
  }
  return json.data;
}

// GET /api/Homepage
export async function fetchHomepage(): Promise<HomepageDataDto> {
  const res = await fetch(`${API_BASE}/Homepage`);
  if (!res.ok) throw new Error(`Homepage API error: ${res.status}`);
  const json: ApiResponse<HomepageDataDto> = await res.json();
  return json.data;
}

// GET /api/Topics
export async function fetchTopics(
  category?: string,
  search?: string,
  page = 1,
  pageSize = 20,
): Promise<TopicDto[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  const res = await fetch(`${API_BASE}/Topics?${params}`);
  if (!res.ok) throw new Error(`Topics API error: ${res.status}`);
  const json: ApiResponse<TopicDto[]> = await res.json();
  return json.data ?? [];
}

// GET /api/Topics/{id}
export async function fetchTopicDetail(id: number): Promise<TopicDetailDto | null> {
  const res = await fetch(`${API_BASE}/Topics/${id}`);
  if (!res.ok) return null;
  const json: ApiResponse<TopicDetailDto> = await res.json();
  return json.data ?? null;
}

// GET /api/Topics/{id}/related
export async function fetchRelatedTopics(id: number): Promise<TopicDto[]> {
  const res = await fetch(`${API_BASE}/Topics/${id}/related`);
  if (!res.ok) return [];
  const json: ApiResponse<TopicDto[]> = await res.json();
  return json.data ?? [];
}

// GET /api/Quiz
export async function fetchQuiz(topicId?: number): Promise<QuizQuestionDto[]> {
  const params = topicId ? `?topicId=${topicId}` : "";
  const res = await fetch(`${API_BASE}/Quiz${params}`);
  if (!res.ok) throw new Error(`Quiz API error: ${res.status}`);
  const json: ApiResponse<QuizQuestionDto[]> = await res.json();
  return json.data ?? [];
}

// POST /api/Quiz/submit
export async function submitQuiz(answers: QuizAnswer[]): Promise<QuizResultDto> {
  return fetchApi<QuizResultDto>("/Quiz/submit", {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}

export async function createQuizQuestion(question: any): Promise<QuizQuestionDto> {
  return fetchApi<QuizQuestionDto>("/Quiz", {
    method: "POST",
    body: JSON.stringify(question),
  });
}

// GET /api/Ranking
export async function fetchRanking(top = 10): Promise<RankingDto[]> {
  const res = await fetch(`${API_BASE}/Ranking?top=${top}`);
  if (!res.ok) throw new Error(`Ranking API error: ${res.status}`);
  const json: ApiResponse<RankingDto[]> = await res.json();
  return json.data ?? [];
}

// POST /api/Chatbot/ask
export async function askChatbot(
  message: string,
  sessionId?: string,
): Promise<{ sessionId: string; answer: string }> {
  const res = await fetch(`${API_BASE}/Chatbot/ask`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ sessionId: sessionId ?? "", message }),
  });
  if (!res.ok) throw new Error(`Chatbot API error: ${res.status}`);
  const json: ApiResponse<ChatbotResponse> = await res.json();
  return {
    sessionId: json.data?.sessionId ?? "",
    answer: json.data?.answer ?? "Xin lỗi, mình chưa trả lời được.",
  };
}

// GET /api/Search
export async function searchEverything(keyword: string): Promise<SearchResult> {
  if (!keyword.trim()) return { topics: [], quiz: [] };
  const res = await fetch(`${API_BASE}/Search?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error(`Search API error: ${res.status}`);
  const json: ApiResponse<SearchResult> = await res.json();
  return json.data ?? { topics: [], quiz: [] };
}
