using Microsoft.AspNetCore.Mvc;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Helpers;
using PhilosophyAPI.Services;

namespace PhilosophyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // ── Google OAuth ──────────────────────────────────────────────────────────

        [HttpPost("google")]
        public async Task<ActionResult<ApiResponse<AuthResponseDto>>> GoogleLogin(
            [FromBody] AuthRequestDto request)
        {
            try
            {
                var result = await _authService.GoogleLoginAsync(request.IdToken);
                return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Đăng nhập thành công"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
        }

        // ── Email / Password Registration ─────────────────────────────────────────

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register(
            [FromBody] RegisterRequestDto request)
        {
            try
            {
                var result = await _authService.RegisterAsync(request);
                return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Đăng ký thành công"));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
        }

        // ── Email / Password Login ────────────────────────────────────────────────

        /// <summary>Login with username or email + password.</summary>
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login(
            [FromBody] LoginRequestDto request)
        {
            try
            {
                var result = await _authService.LoginAsync(request);
                return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Đăng nhập thành công"));
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AuthResponseDto>.ErrorResponse(ex.Message));
            }
        }

    }
}
