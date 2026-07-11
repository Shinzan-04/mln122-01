# Giai cấp và Dân tộc theo Triết học Mác–Lênin

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-1.5_Flash-8E75B2?style=for-the-badge)

> **Đồ án môn học Triết học Mác–Lênin** — Ứng dụng web giáo dục tích hợp hệ thống học tập tương tác, quiz gamification và trợ lý AI về chủ đề Giai cấp & Dân tộc trong Chủ nghĩa Mác–Lênin.

---

## Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Tech Stack](#tech-stack)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và chạy](#cài-đặt-và-chạy)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Thành viên nhóm](#thành-viên-nhóm)

---

## Tổng quan

Dự án xây dựng nền tảng học tập trực tuyến giúp sinh viên tìm hiểu sâu về hai chủ đề cốt lõi trong Triết học Mác–Lênin: **Giai cấp** và **Dân tộc**. Hệ thống kết hợp nội dung học thuật, trắc nghiệm gamification và chatbot AI để tạo trải nghiệm học tập hiện đại, phù hợp với sinh viên đại học.

---

## Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| **Đăng nhập Google OAuth2** | Xác thực 1 chạm bằng tài khoản Google, tự động sinh JWT token |
| **Bài học & Chủ đề** | Thư viện nội dung học thuật có phân loại, tìm kiếm và phân trang |
| **Quiz Gamification** | Trắc nghiệm nhiều lựa chọn, tính điểm tích lũy vào tài khoản sau mỗi lần làm bài |
| **Bảng xếp hạng** | Leaderboard TOP 10 người dùng có điểm cao nhất (podium top 3) |
| **Chatbot AI** | Trợ lý ảo dùng Gemini 1.5 Flash, fallback về keyword matching khi mất kết nối |
| **Phân quyền Admin** | Admin có thể thêm bài học và câu hỏi quiz qua API |
| **Đa chủ đề (Theme)** | 5 bộ màu chuyển đổi được: Ocean Drift, Blush Rose, Sage Garden, Peach Sunset, Lilac Mist |
| **Responsive** | Giao diện tương thích mobile, tablet và desktop |

---

## Tech Stack

### Frontend

| Hạng mục | Công nghệ |
|----------|-----------|
| Framework | React 18 + TypeScript 5.8 |
| Build tool | Vite 6.3 |
| Routing | React Router DOM 6 |
| Styling | CSS Variables (global.css) + Tailwind CSS 4 |
| UI Components | Radix UI (Dialog, Dropdown, Accordion…) |
| Icons | Lucide React |
| Auth | @react-oauth/google |
| Charts | Recharts |
| Forms | React Hook Form |
| Notifications | Sonner |

### Backend

| Hạng mục | Công nghệ |
|----------|-----------|
| Framework | ASP.NET Core Web API (.NET 8) |
| ORM | Entity Framework Core 8 |
| Database | PostgreSQL (NeonDB Cloud) |
| Authentication | JWT Bearer + Google.Apis.Auth |
| Password Hashing | BCrypt.Net-Next |
| AI Integration | Google Gemini 1.5 Flash (REST) |
| API Docs | Swagger (Swashbuckle) |

---

## Cấu trúc dự án

```
MLN/
├── FE/                         # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── api/                # HTTP client config
│   │   ├── components/         # Shared components (MainNav, Loading, …)
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── core/               # Router, global.css
│   │   ├── pages/              # Các trang chính
│   │   │   ├── HomePage.tsx
│   │   │   ├── TopicsPage.tsx
│   │   │   ├── TopicDetailPage.tsx
│   │   │   ├── QuizPage.tsx
│   │   │   ├── ChatbotPage.tsx
│   │   │   ├── RankingPage.tsx
│   │   │   └── LoginPage.tsx
│   │   ├── services/           # API calls (philosophyApi, authApi)
│   │   └── types/              # TypeScript interfaces
│   ├── package.json
│   └── vite.config.js
│
└── BE/                         # Backend (ASP.NET Core)
    ├── Controllers/            # 8 controllers (Auth, Topics, Quiz, …)
    ├── Services/               # Business logic
    ├── Models/                 # Entity models + DTOs
    ├── Data/                   # EF Core DbContext
    ├── Middleware/             # Global exception handler
    ├── appsettings.json
    ├── SETUP_GUIDE.md
    └── BE.csproj
```

---

## Cài đặt và chạy

### Yêu cầu

- Node.js 18+
- .NET 8 SDK
- Git

### Backend

```bash
cd BE
dotnet restore
dotnet run
```

Swagger UI: `http://localhost:5076/swagger`

> Database đã được cấu hình kết nối thẳng lên **NeonDB Cloud** — không cần setup PostgreSQL local.

### Frontend

```bash
cd FE
npm install
npm run dev
```

Ứng dụng chạy tại: `http://localhost:5173`

### Biến môi trường

Backend (`BE/appsettings.json`):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "<NeonDB connection string>"
  },
  "Jwt": {
    "Key": "<secret key>",
    "Issuer": "MLN-API"
  },
  "Google": {
    "ClientId": "<Google OAuth client ID>"
  },
  "GeminiApi": {
    "ApiKey": "<Gemini API key>",
    "Endpoint": "https://generativelanguage.googleapis.com/..."
  }
}
```

---

## API Endpoints

### Auth & Users

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| `POST` | `/api/Auth/google` | Public | Xác thực Google idToken, trả về JWT |
| `GET` | `/api/Ranking` | Public | Top 10 bảng xếp hạng |
| `GET` | `/api/Users` | Admin | Danh sách toàn bộ người dùng |

### Topics (Bài học)

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| `GET` | `/api/Topics` | Public | Danh sách bài viết (phân trang + tìm kiếm) |
| `GET` | `/api/Topics/{id}` | Public | Chi tiết bài viết |
| `GET` | `/api/Topics/{id}/related` | Public | Bài viết liên quan |
| `GET` | `/api/Topics/categories` | Public | Danh sách chuyên mục |
| `POST` | `/api/Topics` | Admin | Thêm bài viết mới |

### Quiz (Trắc nghiệm)

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| `GET` | `/api/Quiz` | Public | Lấy bộ câu hỏi |
| `POST` | `/api/Quiz/submit` | Public / User | Nộp bài, cộng điểm nếu có JWT |
| `POST` | `/api/Quiz` | Admin | Thêm câu hỏi mới |

### Chatbot & Search

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| `POST` | `/api/Chatbot/ask` | Public | Hỏi đáp Gemini AI |
| `GET` | `/api/Search?keyword=` | Public | Tìm kiếm tổng hợp (Topic + Quiz) |
| `GET` | `/api/Homepage` | Public | Dữ liệu cấu trúc trang chủ |

### Chuẩn response

```json
{
  "success": true,
  "message": "Thông báo trạng thái",
  "data": {}
}
```

---

## Database Schema

```
Users
├── Id (UUID)
├── GoogleId, Email, FullName, AvatarUrl
├── Role ("Admin" | "User")
└── TotalScore

Topics
├── Id, Title, Summary, Content
├── Category, ThumbnailUrl
└── CreatedAt

QuizQuestions
├── Id, Question
├── OptionA, OptionB, OptionC, OptionD
├── CorrectAnswer
└── TopicId (FK → Topics)

ChatbotQAs
├── Id, Keywords[], Question, Answer
└── Category

HomepageSections
├── Id, Type, Title, Content
└── OrderIndex
```

---

## Thành viên nhóm

| Vai trò | Sinh viên |
|---------|-----------|
| Leader / Backend Dev | *(Điền tên)* |
| Frontend Dev | *(Điền tên)* |
| Content / Business | *(Điền tên)* |

---

*Phát triển cho môn học Triết học Mác–Lênin — FPT University.*
