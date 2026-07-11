using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.Entities
{
    public class ChatbotQA
    {
        public int Id { get; set; }
        [Required]
        public string Keyword { get; set; } = string.Empty;
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }
}
