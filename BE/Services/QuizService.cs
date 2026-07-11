using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public class QuizService : IQuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<QuizQuestionDto>> GetQuestionsAsync(int? topicId, int count = 20)
        {
            var query = _context.QuizQuestions.AsQueryable();

            if (topicId.HasValue)
            {
                query = query.Where(q => q.TopicId == topicId.Value);
            }

            // Lấy toàn bộ rồi shuffle ngẫu nhiên ở bộ nhớ, sau đó lấy đúng `count` câu
            var all = await query
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

            // Fisher-Yates shuffle
            var rng = new Random();
            for (int i = all.Count - 1; i > 0; i--)
            {
                int j = rng.Next(i + 1);
                (all[i], all[j]) = (all[j], all[i]);
            }

            return all.Take(Math.Min(count, all.Count));
        }

        public async Task<QuizResultDto> SubmitQuizAsync(QuizSubmitRequest request, int? userId)
        {
            var questionIds = request.Answers.Select(a => a.QuestionId).ToList();
            var questions = await _context.QuizQuestions
                .Where(q => questionIds.Contains(q.Id))
                .ToDictionaryAsync(q => q.Id);

            int correctCount = 0;
            foreach (var answer in request.Answers)
            {
                if (questions.TryGetValue(answer.QuestionId, out var question))
                {
                    if (question.CorrectAnswer.Trim().ToUpper() == answer.SelectedAnswer.Trim().ToUpper())
                    {
                        correctCount++;
                    }
                }
            }

            int score = (int)((double)correctCount / Math.Max(1, request.Answers.Count) * 10);

            if (userId.HasValue)
            {
                var user = await _context.Users.FindAsync(userId.Value);
                if (user != null)
                {
                    user.TotalScore += score;
                    await _context.SaveChangesAsync();
                }
            }

            return new QuizResultDto
            {
                Score = score,
                CorrectAnswers = correctCount,
                TotalQuestions = request.Answers.Count
            };
        }

        public async Task<QuizQuestionDto> CreateQuestionAsync(QuizQuestionCreateDto request)
        {
            var entity = new PhilosophyAPI.Entities.QuizQuestion
            {
                TopicId = request.TopicId,
                Question = request.Question,
                OptionA = request.OptionA,
                OptionB = request.OptionB,
                OptionC = request.OptionC,
                OptionD = request.OptionD,
                CorrectAnswer = request.CorrectAnswer.Trim().ToUpper()
            };

            _context.QuizQuestions.Add(entity);
            await _context.SaveChangesAsync();

            return new QuizQuestionDto
            {
                Id = entity.Id,
                TopicId = entity.TopicId,
                Question = entity.Question,
                OptionA = entity.OptionA,
                OptionB = entity.OptionB,
                OptionC = entity.OptionC,
                OptionD = entity.OptionD
            };
        }
    }
}
