using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RankingController : ControllerBase
    {
        private readonly IUserService _userService;

        public RankingController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<RankingDto>>>> GetLeaderboard([FromQuery] int top = 10)
        {
            var leaderboard = await _userService.GetLeaderboardAsync(top);
            return Ok(ApiResponse<IEnumerable<RankingDto>>.SuccessResponse(leaderboard, "Get leaderboard successfully"));
        }
    }
}
