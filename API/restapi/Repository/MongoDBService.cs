using restapi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using restapi.Interface;

namespace restapi.Repository
{
    /// <summary>
    /// service provide for handle mongodb database
    /// needed to register in program.cs
    /// </summary>
    public class MongoDBService:IMongoDBService
    {
        //readoly var which represent metric collection in this class
        private readonly IMongoCollection<Metric> _metricCollection;

        /// <summary>
        /// Constructor
        /// the parameter pass the mongodb property setting in to used them as class varible
        /// </summary>
        /// <param name="mongoDBSetting"></param>
        public MongoDBService(IOptions<MongoDbSetting> mongoDBSetting)
        {
            MongoClient client = new MongoClient(mongoDBSetting.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSetting.Value.DatabaseName);
            _metricCollection = database.GetCollection<Metric>(mongoDBSetting.Value.CollectionName);

        }

        /// <summary>
        /// async function to insert one single document based on the parameter
        /// </summary>
        /// <param name="metric"></param>
        /// <returns></returns>
        public async Task CreateAsync(Metric metric)
        {
            await _metricCollection.InsertOneAsync(metric);
            return;
        }

        /// <summary>
        /// Function for return every documentation that matches the fields in metric.cs in a list
        /// </summary>
        /// <returns></returns>
        public async Task<List<Metric>> GetAsync()
        {
            //new BsonDocument used to make sure no filter is here
            //tolistasync - used to avoid cursor
            return await _metricCollection.Find(new BsonDocument()).ToListAsync();
        }

        /// <summary>
        /// function for return the document that matches with user input id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Metric?> GetIdAsync(string id)
        {
            return await _metricCollection.Find(x => x.ID == id).FirstOrDefaultAsync();

        }
    }
}
