using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopicsController : ControllerBase
    {
        private readonly ITopicService _topicService;

        public TopicsController(ITopicService topicService)
        {
            _topicService = topicService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TopicDto>>>> GetTopics(
            [FromQuery] string? category,
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var topics = await _topicService.GetAllTopicsAsync(category, search, page, pageSize);
            return Ok(ApiResponse<IEnumerable<TopicDto>>.SuccessResponse(topics, "Get topics successfully"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TopicDetailDto>>> GetTopicDetail(int id)
        {
            var topic = await _topicService.GetTopicByIdAsync(id);
            if (topic == null)
            {
                return NotFound(ApiResponse<TopicDetailDto>.ErrorResponse("Topic not found"));
            }
            return Ok(ApiResponse<TopicDetailDto>.SuccessResponse(topic, "Get topic detail successfully"));
        }

        [HttpGet("{id}/related")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TopicDto>>>> GetRelatedTopics(int id)
        {
            var topics = await _topicService.GetRelatedTopicsAsync(id);
            return Ok(ApiResponse<IEnumerable<TopicDto>>.SuccessResponse(topics, "Get related topics successfully"));
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ApiResponse<IEnumerable<string>>>> GetCategories()
        {
            var categories = await _topicService.GetCategoriesAsync();
            return Ok(ApiResponse<IEnumerable<string>>.SuccessResponse(categories, "Get categories successfully"));
        }

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<TopicDetailDto>>> CreateTopic([FromBody] TopicCreateDto request)
        {
            var result = await _topicService.CreateTopicAsync(request);
            return Ok(ApiResponse<TopicDetailDto>.SuccessResponse(result, "Topic created successfully"));
        }
    }
}
