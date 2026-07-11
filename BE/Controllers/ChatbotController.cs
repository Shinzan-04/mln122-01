using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatbotController : ControllerBase
    {
        private readonly IChatbotService _chatbotService;

        public ChatbotController(IChatbotService chatbotService)
        {
            _chatbotService = chatbotService;
        }

        [HttpPost("ask")]
        public async Task<ActionResult<ApiResponse<ChatbotResponse>>> Ask([FromBody] ChatbotRequest request)
        {
            // Extract userId from JWT token if user is authenticated
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
            {
                var idClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(idClaim, out int parsedId))
                {
                    userId = parsedId;
                }
            }

            var response = await _chatbotService.AskAsync(request, userId);
            return Ok(ApiResponse<ChatbotResponse>.SuccessResponse(response, "Chatbot replied successfully"));
        }
    }
}
