namespace PhilosophyAPI.DTOs
{
    public class HomepageDataDto
    {
        public HeroSectionDto Hero { get; set; } = new();
        public List<TopicDto> FeaturedTopics { get; set; } = new();
        public List<TimelineItemDto> Timeline { get; set; } = new();
        public List<QuoteDto> Quotes { get; set; } = new();
    }

    public class HeroSectionDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
    }

    public class TimelineItemDto
    {
        public string Year { get; set; } = string.Empty;
        public string Event { get; set; } = string.Empty;
    }

    public class QuoteDto
    {
        public string Text { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
    }
}
