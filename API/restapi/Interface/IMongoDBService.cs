using restapi.Models;

// temporary not using
// Causing system.invalidoperationexception:
// unable to resolve service for type 'rest api.interface.imongodbservice' while attempting to activate 'restapi.controllers.metriccontroller'.
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
