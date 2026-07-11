using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface IChatbotService
    {
        Task<ChatbotResponse> AskAsync(ChatbotRequest request, int? userId = null);
    }
}
