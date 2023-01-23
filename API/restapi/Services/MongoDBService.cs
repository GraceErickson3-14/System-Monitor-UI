using restapi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace restapi.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Metric> _metricCollection;
        public MongoDBService(IOptions<MongoDbSetting> mongoDBSetting)
        {
            MongoClient client = new MongoClient(mongoDBSetting.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSetting.Value.DatabaseName);
            _metricCollection = database.GetCollection<Metric>(mongoDBSetting.Value.CollectionName);

        }


        public async Task  CreateAsync(Metric metric)
        {
            await _metricCollection.InsertOneAsync(metric);
            return;
        }

        public async Task<List<Metric>> GetAsync()
        {
            return await _metricCollection.Find(new BsonDocument()).ToListAsync();
        }
    }
}
