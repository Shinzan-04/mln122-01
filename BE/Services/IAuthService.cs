using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> GoogleLoginAsync(string idToken);
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    }
}
