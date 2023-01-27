using System;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
namespace SystemMonitor.Data
{
    public class MetricsService 
    {
        private readonly IMongoCollection<Metric> _metrics;

        public MetricsService(IOptions<MetricsDatabaseSettings> options)
        {
            //create an instance of the object
            //object is responsible for running db operations

            var mongoClient = new MongoClient(options.Value.ConnectionString);
            _metrics = mongoClient.GetDatabase(options.Value.DatabaseName).GetCollection<Metric>(options.Value.MetricsCollectionName);
        }




        //Get all IP/ID
        public async Task<List<string>> Get() =>
  (await _metrics.Find(metric => true).ToListAsync()).Select(metric => metric.IpAddress).ToList();

        //Get at passed IP
        public async Task<Metric> Get(string ipAddress) =>
           await _metrics.Find(metric => metric.IpAddress == ipAddress).FirstOrDefaultAsync();


        //Insert new Document
        public async Task Create(Metric metric) => 
            await _metrics.InsertOneAsync(metric);






        //The Update method replaces an existing metric with the specified IP address with the new metric.
        public async Task Update(string ipAddress, Metric metricIn) =>
            await _metrics.ReplaceOneAsync(metric => metric.IpAddress == ipAddress, metricIn);

        //The Remove method removes a metric from the collection by either passing in a Metric object or the IP address of the metric to be removed.
        public async Task Remove(Metric metricIn) =>
            await _metrics.DeleteOneAsync(metric => metric.IpAddress == metricIn.IpAddress);

        public async Task Remove(string ipAddress) =>
           await _metrics.DeleteOneAsync(metric => metric.IpAddress == ipAddress);

    }
}