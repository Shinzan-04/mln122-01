namespace PhilosophyAPI.DTOs
{
    public class TopicDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class TopicDetailDto : TopicDto
    {
        public string Content { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
    }
}
