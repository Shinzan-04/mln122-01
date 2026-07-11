using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface ITopicService
    {
        Task<IEnumerable<TopicDto>> GetAllTopicsAsync(string? category, string? search, int page, int pageSize);
        Task<TopicDetailDto?> GetTopicByIdAsync(int id);
        Task<IEnumerable<TopicDto>> GetRelatedTopicsAsync(int id);
        Task<IEnumerable<string>> GetCategoriesAsync();
        Task<TopicDetailDto> CreateTopicAsync(TopicCreateDto request);
    }
}
