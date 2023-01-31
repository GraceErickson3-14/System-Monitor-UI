using restapi.Models;

namespace restapi.Interface
{
    /// <summary>
    /// interface used to reduce coupling
    /// </summary>
    public interface IMongoDBService
    {
        Task CreateAsync(Metric metric);
        Task<List<Metric>> GetAsync();
        Task<Metric?> GetIdAsync(string id);
    }
}
