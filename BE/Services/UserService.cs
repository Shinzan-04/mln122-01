using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RankingDto>> GetLeaderboardAsync(int top = 50)
        {
            var users = await _context.Users
                .Where(u => u.TotalScore > 0)
                .OrderByDescending(u => u.TotalScore)
                .Take(top)
                .ToListAsync();

            var ranking = new List<RankingDto>();
            int rank = 1;
            foreach (var user in users)
            {
                ranking.Add(new RankingDto
                {
                    Rank      = rank++,
                    UserId    = user.Id,
                    Name      = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    TotalScore = user.TotalScore
                });
            }

            return ranking;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    Name = u.Name,
                    AvatarUrl = u.AvatarUrl,
                    TotalScore = u.TotalScore,
                    Role = u.Role
                })
                .ToListAsync();
        }
    }
}
