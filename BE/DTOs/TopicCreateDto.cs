using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.DTOs
{
    public class TopicCreateDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
    }
}
