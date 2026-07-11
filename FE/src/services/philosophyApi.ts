import { requestApi } from "../api/http";
import type {
  ChatbotResponse,
  HomepageData,
  QuizAnswer,
  QuizQuestion,
  QuizResult,
  RankingEntry,
  SearchResult,
  Topic,
  TopicDetail
} from "../types/api";

export async function getHomepageData(): Promise<HomepageData> {
  return requestApi<HomepageData>("/Homepage");
}

export async function getTopics(params?: {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<Topic[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
  const query = searchParams.toString();
  return requestApi<Topic[]>(`/Topics${query ? `?${query}` : ""}`);
}

export async function getTopicDetail(id: number): Promise<TopicDetail> {
  return requestApi<TopicDetail>(`/Topics/${id}`);
}

export async function getTopicCategories(): Promise<string[]> {
  return requestApi<string[]>("/Topics/categories");
}

export async function getQuiz(topicId?: number, count = 20): Promise<QuizQuestion[]> {
  const params = new URLSearchParams();
  params.set("count", String(count));
  if (topicId) params.set("topicId", String(topicId));
  return requestApi<QuizQuestion[]>(`/Quiz?${params.toString()}`);
}

export async function submitQuiz(answers: QuizAnswer[]): Promise<QuizResult> {
  return requestApi<QuizResult>("/Quiz/submit", {
    method: "POST",
    body: JSON.stringify({ answers })
  });
}

export async function askChatbot(message: string): Promise<ChatbotResponse> {
  return requestApi<ChatbotResponse>(
    "/Chatbot/ask",
    {
      method: "POST",
      body: JSON.stringify({ message })
    },
    9500
  );
}

export async function searchAll(keyword: string): Promise<SearchResult> {
  const query = encodeURIComponent(keyword);
  return requestApi<SearchResult>(`/Search?keyword=${query}`);
}

export async function getRanking(top = 50): Promise<RankingEntry[]> {
  return requestApi<RankingEntry[]>(`/Ranking?top=${top}`);
}
