using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public class SearchService : ISearchService
    {
        private readonly AppDbContext _context;

        public SearchService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> SearchEverythingAsync(string keyword)
        {
            var searchLower = keyword.ToLower();

            var topics = await _context.Topics
                .Where(t => t.Title.ToLower().Contains(searchLower) || t.Summary.ToLower().Contains(searchLower))
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

            var quiz = await _context.QuizQuestions
                .Where(q => q.Question.ToLower().Contains(searchLower))
                .Select(q => new QuizQuestionDto
                {
                    Id = q.Id,
                    TopicId = q.TopicId,
                    Question = q.Question,
                    OptionA = q.OptionA,
                    OptionB = q.OptionB,
                    OptionC = q.OptionC,
                    OptionD = q.OptionD
                })
                .ToListAsync();

            return new
            {
                Topics = topics,
                Quiz = quiz
            };
        }
    }
}
