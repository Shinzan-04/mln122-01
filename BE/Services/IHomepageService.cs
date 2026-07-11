using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface IHomepageService
    {
        Task<HomepageDataDto> GetHomepageDataAsync();
    }
}
