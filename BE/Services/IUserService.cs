using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<RankingDto>> GetLeaderboardAsync(int top = 50);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}
