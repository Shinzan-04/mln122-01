using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface IQuizService
    {
        Task<IEnumerable<QuizQuestionDto>> GetQuestionsAsync(int? topicId, int count = 20);
        Task<QuizResultDto> SubmitQuizAsync(QuizSubmitRequest request, int? userId);
        Task<QuizQuestionDto> CreateQuestionAsync(QuizQuestionCreateDto request);
    }
}