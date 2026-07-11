using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<QuizQuestionDto>>>> GetQuiz(
            [FromQuery] int? topicId,
            [FromQuery] int count = 20)
        {
            if (count < 1) count = 1;
            if (count > 50) count = 50;   // giới hạn tối đa 50 câu
            var questions = await _quizService.GetQuestionsAsync(topicId, count);
            return Ok(ApiResponse<IEnumerable<QuizQuestionDto>>.SuccessResponse(questions, "Get quiz questions successfully"));
        }

        [HttpPost("submit")]
        public async Task<ActionResult<ApiResponse<QuizResultDto>>> SubmitQuiz([FromBody] QuizSubmitRequest request)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
            {
                var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(idClaim, out int parsedId))
                {
                    userId = parsedId;
                }
            }

            var result = await _quizService.SubmitQuizAsync(request, userId);
            return Ok(ApiResponse<QuizResultDto>.SuccessResponse(result, "Quiz submitted successfully"));
        }

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<QuizQuestionDto>>> CreateQuestion([FromBody] QuizQuestionCreateDto request)
        {
            var result = await _quizService.CreateQuestionAsync(request);
            return Ok(ApiResponse<QuizQuestionDto>.SuccessResponse(result, "Quiz question created successfully"));
        }
    }
}
