using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.Entities
{
    public class User
    {
        public int Id { get; set; }

        /// <summary>Unique login handle (e.g. "nguyen_duc"). Always set.</summary>
        [Required]
        public string Username { get; set; } = string.Empty;

        /// <summary>Null for Google OAuth accounts.</summary>
        public string? GoogleId { get; set; }

        /// <summary>Optional — Google users always have one; email/password users may omit.</summary>
        [EmailAddress]
        public string? Email { get; set; }

        public string Name { get; set; } = string.Empty;

        public string AvatarUrl { get; set; } = string.Empty;

        /// <summary>Null for Google OAuth accounts.</summary>
        public string? PasswordHash { get; set; }

        public int TotalScore { get; set; } = 0;

        public string Role { get; set; } = "User";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
