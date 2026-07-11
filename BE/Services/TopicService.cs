using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Services
{
    public class TopicService : ITopicService
    {
        private readonly AppDbContext _context;

        public TopicService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TopicDto>> GetAllTopicsAsync(string? category, string? search, int page, int pageSize)
        {
            var query = _context.Topics.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(t => t.Category == category);
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(t => t.Title.Contains(search) || t.Summary.Contains(search));
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TopicDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Slug = t.Slug,
                    Summary = t.Summary,
                    ThumbnailUrl = t.ThumbnailUrl,
                    ImageSource = t.ImageSource,
                    Category = t.Category,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<TopicDetailDto?> GetTopicByIdAsync(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null) return null;

            return new TopicDetailDto
            {
                Id = topic.Id,
                Title = topic.Title,
                Slug = topic.Slug,
                Summary = topic.Summary,
                ThumbnailUrl = topic.ThumbnailUrl,
                ImageSource = topic.ImageSource,
                Category = topic.Category,
                CreatedAt = topic.CreatedAt,
                Content = topic.Content,
                Author = topic.Author
            };
        }

        public async Task<IEnumerable<TopicDto>> GetRelatedTopicsAsync(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null) return Enumerable.Empty<TopicDto>();

            return await _context.Topics
                .Where(t => t.Category == topic.Category && t.Id != id)
                .Take(5)
                .Select(t => new TopicDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Slug = t.Slug,
                    Summary = t.Summary,
                    ThumbnailUrl = t.ThumbnailUrl,
                    ImageSource = t.ImageSource,
                    Category = t.Category,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetCategoriesAsync()
        {
            return await _context.Topics
                .Select(t => t.Category)
                .Distinct()
                .ToListAsync();
        }

        public async Task<TopicDetailDto> CreateTopicAsync(TopicCreateDto request)
        {
            var topic = new PhilosophyAPI.Entities.Topic
            {
                Title = request.Title,
                Slug = request.Title.ToLower().Replace(" ", "-").Replace("đ", "d").Replace("ê", "e"), // simple slug logic
                Summary = request.Summary,
                Content = request.Content,
                ThumbnailUrl = request.ThumbnailUrl,
                ImageSource = request.ImageSource,
                Category = request.Category,
                Author = request.Author,
                CreatedAt = DateTime.UtcNow
            };

            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return new TopicDetailDto
            {
                Id = topic.Id,
                Title = topic.Title,
                Slug = topic.Slug,
                Summary = topic.Summary,
                ThumbnailUrl = topic.ThumbnailUrl,
                ImageSource = topic.ImageSource,
                Category = topic.Category,
                CreatedAt = topic.CreatedAt,
                Content = topic.Content,
                Author = topic.Author
            };
        }
    }
}
