using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomepageController : ControllerBase
    {
        private readonly IHomepageService _homepageService;

        public HomepageController(IHomepageService homepageService)
        {
            _homepageService = homepageService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<HomepageDataDto>>> GetHomepage()
        {
            var data = await _homepageService.GetHomepageDataAsync();
            return Ok(ApiResponse<HomepageDataDto>.SuccessResponse(data, "Get homepage data successfully"));
        }
    }
}
