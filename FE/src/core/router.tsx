import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ChatbotPage } from "../pages/ChatbotPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { QuizPage } from "../pages/QuizPage";
import { RankingPage } from "../pages/RankingPage";
import { TopicDetailPage } from "../pages/TopicDetailPage";
import { TopicsPage } from "../pages/TopicsPage";

export const appRouter = createBrowserRouter([
  { path: "/login",    element: <LoginPage />    },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "chatbot", element: <ChatbotPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "ranking", element: <RankingPage /> },
      { path: "topics", element: <TopicsPage /> },
      { path: "topics/:id", element: <TopicDetailPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
