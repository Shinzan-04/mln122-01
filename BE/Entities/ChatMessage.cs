using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.Entities
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SessionId { get; set; } = string.Empty;

        /// <summary>
        /// "user" | "assistant" | "system"
        /// </summary>
        [Required]
        public string Role { get; set; } = "user";

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ChatSession? Session { get; set; }
    }
}
