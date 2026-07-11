namespace PhilosophyAPI.DTOs
{
    public class ChatbotRequest
    {
        public string SessionId { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    public class ChatbotResponse
    {
        public string SessionId { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}
