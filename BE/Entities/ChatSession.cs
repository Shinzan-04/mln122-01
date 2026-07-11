using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.Entities
{
    public class ChatSession
    {
        [Key]
        public string Id { get; set; } = string.Empty;

        /// <summary>
        /// Nullable: nếu null thì đây là phiên chat của Khách (Guest).
        /// Khi Guest đăng nhập, cập nhật UserId để liên kết lại.
        /// </summary>
        public int? UserId { get; set; }

        public string Title { get; set; } = "New Chat";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User? User { get; set; }
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}
