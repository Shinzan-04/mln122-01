using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public class HomepageService : IHomepageService
    {
        private readonly AppDbContext _context;

        public HomepageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<HomepageDataDto> GetHomepageDataAsync()
        {
            var sections = await _context.HomepageSections.OrderBy(s => s.DisplayOrder).ToListAsync();
            
            var hero = sections.FirstOrDefault(s => s.Title.Contains("Hero")) ?? new Entities.HomepageSection
            {
                Title = "Những nhân tố ảnh hưởng tới quy mô tích lũy tư bản",
                Description = "Chương 3, Phần II Kinh tế Chính trị Mác–Lênin (Bộ GD&ĐT, 2021)",
                ImageUrl = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
            };

            var featuredTopics = await _context.Topics
                .OrderByDescending(t => t.CreatedAt)
                .Take(4)
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

            // Mocking timeline and quotes for now as they weren't in the initial DB design
            // but requested in the API response format
            var timeline = new List<TimelineItemDto>
            {
                new TimelineItemDto { Year = "1848", Event = "Tuyên ngôn của Đảng Cộng sản" },
                new TimelineItemDto { Year = "1917", Event = "Cách mạng Tháng Mười Nga" }
            };

            var quotes = new List<QuoteDto>
            {
                new QuoteDto { Text = "Học, học nữa, học mãi.", Author = "V.I.Lenin" },
                new QuoteDto { Text = "Vô sản tất cả các nước, đoàn kết lại!", Author = "Karl Marx" }
            };

            return new HomepageDataDto
            {
                Hero = new HeroSectionDto
                {
                    Title = hero.Title,
                    Description = hero.Description,
                    ImageUrl = hero.ImageUrl,
                    ImageSource = hero.ImageSource
                },
                FeaturedTopics = featuredTopics,
                Timeline = timeline,
                Quotes = quotes
            };
        }
    }
}
