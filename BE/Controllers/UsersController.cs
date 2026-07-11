using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<IEnumerable<UserDto>>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(ApiResponse<IEnumerable<UserDto>>.SuccessResponse(users, "Get all users successfully"));
        }
    }
}
