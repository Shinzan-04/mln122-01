using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<object>>> Search([FromQuery] string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                return Ok(ApiResponse<object>.SuccessResponse(new { Topics = new List<object>(), Quiz = new List<object>() }, "Empty search result"));
            }

            var result = await _searchService.SearchEverythingAsync(keyword);
            return Ok(ApiResponse<object>.SuccessResponse(result, "Search completed successfully"));
        }
    }
}
