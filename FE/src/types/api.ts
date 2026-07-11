export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Topic {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl: string;
  imageSource: string;
  category: string;
  createdAt: string;
}

export interface TopicDetail extends Topic {
  content: string;
  author: string;
}

export interface HeroSection {
  title: string;
  description: string;
  imageUrl: string;
}

export interface TimelineItem {
  year: string;
  event: string;
}

export interface QuoteItem {
  text: string;
  author: string;
}

export interface HomepageData {
  hero: HeroSection;
  featuredTopics: Topic[];
  timeline: TimelineItem[];
  quotes: QuoteItem[];
}

export interface ChatbotRequest {
  message: string;
}

export interface ChatbotResponse {
  answer: string;
}

export interface QuizQuestion {
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

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface SearchResult {
  topics: Topic[];
  quiz: QuizQuestion[];
}

export interface RankingEntry {
  rank: number;
  userId: number;
  name: string;
  avatarUrl: string;
  totalScore: number;
}
