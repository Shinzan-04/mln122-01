using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Entities;
using System.Text;
using System.Text.Json;

namespace PhilosophyAPI.Services
{
    public class ChatbotService : IChatbotService
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        private const string SystemPrompt =
            "Bạn là trợ lý học tập chuyên về chủ đề \"Những nhân tố ảnh hưởng tới quy mô tích lũy tư bản\" trong môn Kinh tế Chính trị Mác – Lênin (Chương 3, Phần II).\n\n" +
            "KIẾN THỨC NỀN TẢNG:\n" +
            "Tích lũy tư bản là sự chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm. Nguồn gốc duy nhất là giá trị thặng dư. Có 4 nhân tố chủ yếu ảnh hưởng quy mô tích lũy:\n\n" +
            "1. TRÌNH ĐỘ KHAI THÁC SỨC LAO ĐỘNG: m' = m/v × 100%. Tỷ suất m' tăng → khối lượng m tăng → tăng quy mô tích lũy.\n\n" +
            "2. NĂNG SUẤT LAO ĐỘNG XÃ HỘI: NSLĐ tăng → giá trị TLSH giảm → giá trị SLĐ giảm → nhà TB thu được nhiều m hơn → tăng tích lũy.\n\n" +
            "3. SỬ DỤNG HIỆU QUẢ MÁY MÓC: Chênh lệch giữa tư bản sử dụng và tiêu dùng. Máy dùng toàn bộ tính năng nhưng giá trị khấu hao dần → lực lượng phục vụ không công + quỹ khấu hao tích lũy = nguồn mở rộng SX.\n\n" +
            "4. ĐẠI LƯỢNG TƯ BẢN ỨNG TRƯỚC: TB ứng trước lớn + thị trường thuận lợi → quy mô SX lớn → nhiều m → nhiều tích lũy.\n\n" +
            "HỆ QUẢ: Tăng cấu tạo hữu cơ (c/v), tăng tích tụ & tập trung TB, tăng chênh lệch thu nhập.\n\n" +
            "VAI TRÒ CỦA BẠN:\n" +
            "- Giải thích các khái niệm bằng ngôn ngữ đơn giản, dễ hiểu\n" +
            "- Đưa ra ví dụ thực tiễn khi được hỏi\n" +
            "- Giúp sinh viên phân biệt các khái niệm dễ nhầm lẫn\n" +
            "- Hỗ trợ ôn tập bằng cách đặt câu hỏi kiểm tra\n" +
            "- Liên hệ lý thuyết với thực tiễn doanh nghiệp hiện đại\n" +
            "- Trả lời bằng tiếng Việt, ngắn gọn và chính xác về mặt học thuật\n" +
            "- Nếu được hỏi về chủ đề ngoài phạm vi này, nhẹ nhàng hướng về chủ đề tích lũy tư bản\n\n" +
            "LUÔN CHÚ Ý ĐẾN LỊCH SỬ TRÒ CHUYỆN: Nếu người dùng hỏi câu tiếp nối như 'giải thích chi tiết hơn', 'cho ví dụ cụ thể', hãy dựa vào ngữ cảnh câu trước, trả lời sâu hơn, TUYỆT ĐỐI KHÔNG lặp lại y chang câu trả lời cũ.";

        private static readonly string[] GeminiModels = new[]
        {
            "gemini-2.5-flash",
            "gemini-2.0-flash-lite",
            "gemini-2.0-flash"
        };

        public ChatbotService(AppDbContext context, HttpClient httpClient, IConfiguration configuration)
        {
            _context = context;
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<ChatbotResponse> AskAsync(ChatbotRequest request, int? userId = null)
        {
            // 1. Generate or reuse SessionId
            var sessionId = string.IsNullOrWhiteSpace(request.SessionId)
                ? Guid.NewGuid().ToString()
                : request.SessionId;

            // 2. Find or create ChatSession
            var session = await _context.ChatSessions
                .Include(s => s.Messages)
                .FirstOrDefaultAsync(s => s.Id == sessionId);

            if (session == null)
            {
                session = new ChatSession
                {
                    Id = sessionId,
                    UserId = userId,
                    Title = request.Message.Length > 50
                        ? request.Message[..50] + "..."
                        : request.Message
                };
                _context.ChatSessions.Add(session);
            }
            else if (userId.HasValue && session.UserId == null)
            {
                // Guest logged in → link session to their account
                session.UserId = userId;
            }

            // 3. Save user message
            _context.ChatMessages.Add(new ChatMessage
            {
                SessionId = sessionId,
                Role = "user",
                Content = request.Message,
                CreatedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            // 4. Call Gemini AI (with chat history for memory)
            string answer;
            try
            {
                var apiKey = _configuration["GeminiApiKey"];
                if (string.IsNullOrEmpty(apiKey))
                {
                    answer = await FallbackWithContextAsync(request.Message, session);
                }
                else
                {
                    answer = await CallGeminiWithHistory(apiKey, session);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Chatbot] AI Error: {ex.Message}");
                answer = await FallbackWithContextAsync(request.Message, session);
            }

            // 5. Save AI response
            _context.ChatMessages.Add(new ChatMessage
            {
                SessionId = sessionId,
                Role = "assistant",
                Content = answer,
                CreatedAt = DateTime.UtcNow
            });
            session.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return new ChatbotResponse
            {
                SessionId = sessionId,
                Answer = answer
            };
        }

        private async Task<string> CallGeminiWithHistory(string apiKey, ChatSession session)
        {
            // Build multi-turn conversation from DB history (last 10 messages)
            var recentMessages = session.Messages
                .OrderByDescending(m => m.CreatedAt)
                .Take(10)
                .OrderBy(m => m.CreatedAt)
                .ToList();

            var contents = new List<object>();
            foreach (var msg in recentMessages)
            {
                contents.Add(new
                {
                    role = msg.Role == "assistant" ? "model" : "user",
                    parts = new[] { new { text = msg.Content } }
                });
            }

            var payload = new
            {
                system_instruction = new
                {
                    parts = new[] { new { text = SystemPrompt } }
                },
                contents = contents,
                generationConfig = new
                {
                    temperature = 1.0,
                    topP = 0.95,
                    maxOutputTokens = 500 // Limit response length for speed
                }
            };

            var jsonPayload = JsonSerializer.Serialize(payload);

            // Try each model once, no retry - move to next immediately on failure
            foreach (var model in GeminiModels)
            {
                string url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";
                try
                {
                    var httpContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    var response = await _httpClient.PostAsync(url, httpContent);

                    if (!response.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"[Chatbot] Model {model} failed: {response.StatusCode}");
                        continue; // Try next model immediately
                    }

                    var responseString = await response.Content.ReadAsStringAsync();
                    using var jsonDocument = JsonDocument.Parse(responseString);
                    var root = jsonDocument.RootElement;

                    if (root.TryGetProperty("candidates", out var candidates) && candidates.GetArrayLength() > 0)
                    {
                        var firstCandidate = candidates[0];
                        if (firstCandidate.TryGetProperty("content", out var contentElement))
                        {
                            if (contentElement.TryGetProperty("parts", out var parts) && parts.GetArrayLength() > 0)
                            {
                                var text = parts[0].GetProperty("text").GetString();
                                if (!string.IsNullOrEmpty(text))
                                {
                                    Console.WriteLine($"[Chatbot] Success with model: {model}");
                                    return text.Trim();
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[Chatbot] Model {model} exception: {ex.Message}");
                    continue;
                }
            }

            throw new Exception("All Gemini models failed");
        }

        /// <summary>
        /// Context-aware fallback: uses DB history to understand follow-up questions.
        /// </summary>
        /// <summary>
        /// Remove Vietnamese diacritics for accent-insensitive keyword matching.
        /// "Tích lũy tư bản" → "tich luy tu ban"
        /// </summary>
        private static string RemoveDiacritics(string text)
        {
            // Handle Vietnamese đ/Đ which is NOT decomposed by FormD
            text = text.Replace('đ', 'd').Replace('Đ', 'D');
            var normalized = text.Normalize(System.Text.NormalizationForm.FormD);
            var sb = new System.Text.StringBuilder();
            foreach (var c in normalized)
            {
                var cat = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
                if (cat != System.Globalization.UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }
            return sb.ToString().Normalize(System.Text.NormalizationForm.FormC);
        }

        private async Task<string> FallbackWithContextAsync(string message, ChatSession session)
        {
            var msgLower = RemoveDiacritics(message.ToLower());
            var qas = await _context.ChatbotQAs.ToListAsync();

            // 1) Try keyword match (accent-insensitive, longest keyword first to avoid false early match)
            // Flatten all (keyword, qa) pairs then sort by keyword length descending
            var allPairs = qas
                .SelectMany(qa => qa.Keyword.ToLower()
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(kw => (kw: RemoveDiacritics(kw), qa)))
                .OrderByDescending(p => p.kw.Length)
                .ToList();

            foreach (var (kw, qa) in allPairs)
            {
                if (msgLower.Contains(kw))
                    return qa.Answer;
            }

            // 2) Check if user is asking a follow-up
            var followUpPhrases = new[] { "giai thich", "ro hon", "chi tiet", "vi du", "noi them", "tiep", "them", "cu the", "tai sao", "vi sao", "nhu the nao" };
            bool isFollowUp = followUpPhrases.Any(p => msgLower.Contains(p));

            if (isFollowUp && session.Messages.Count > 1)
            {
                var previousUserMsg = session.Messages
                    .Where(m => m.Role == "user")
                    .OrderByDescending(m => m.CreatedAt)
                    .Skip(1)
                    .FirstOrDefault();

                if (previousUserMsg != null)
                {
                    var prevMsgLower = RemoveDiacritics(previousUserMsg.Content.ToLower());
                    foreach (var qa in qas)
                    {
                        var keywords = qa.Keyword.ToLower().Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                        foreach (var keyword in keywords)
                        {
                            if (prevMsgLower.Contains(RemoveDiacritics(keyword)))
                            {
                                return $"Về câu hỏi trước của bạn, đây là giải thích chi tiết hơn:\n\n{qa.Answer}\n\nBạn có muốn tìm hiểu thêm khía cạnh nào khác không?";
                            }
                        }
                    }
                }
            }

            return "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về: 'tích lũy tư bản là gì?', 'trình độ khai thác sức lao động', 'năng suất lao động xã hội', 'lực lượng phục vụ không công của máy móc', 'tư bản ứng trước', 'tích tụ và tập trung tư bản', hoặc 'bần cùng hóa giai cấp công nhân'.";
        }
    }
}
