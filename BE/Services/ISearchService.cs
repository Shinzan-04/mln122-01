using PhilosophyAPI.DTOs;

namespace PhilosophyAPI.Services
{
    public interface ISearchService
    {
        Task<object> SearchEverythingAsync(string keyword);
    }
}
