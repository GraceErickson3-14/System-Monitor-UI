using restapi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using restapi.Interface;
using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using static MongoDB.Driver.WriteConcern;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;
using DnsClient.Protocol;
using System.Formats.Asn1;

namespace restapi.Repository
{
    /// <summary>
    /// service provide for handle mongodb database
    /// needed to register in program.cs
    /// </summary>
    public class MongoDBService
    {

        private readonly IMongoCollection<Threshold> _thresholdCollection;

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
            _metricCollection = database.GetCollection<Metric>(mongoDBSetting.Value.CollectionNameA);
            _thresholdCollection = database.GetCollection<Threshold>(mongoDBSetting.Value.CollectionNameB);

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

        public async Task CreateAsyncTh(Threshold threshold)
        {
            await _thresholdCollection.InsertOneAsync(threshold);
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

        public async Task<List<Threshold>> GetAsyncTh()
        {
            //new BsonDocument used to make sure no filter is here
            //tolistasync - used to avoid cursor
            return await _thresholdCollection.Find(new BsonDocument()).ToListAsync();
        }

        /// <summary>
        /// function for return the document that matches with user input id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<List<Metric>> GetIdAsync(string ip)
        {
            return await _metricCollection.Find(x => x.IpAddress == ip).ToListAsync();

        }

        public async Task<Threshold?> GetThIdAsync(string id)
        {
            return await _thresholdCollection.Find(x => x.ThreshId == id).FirstOrDefaultAsync();

        }


        public async Task updateThresh(string ThreshId, [FromBody] Threshold threshold)
        {
            await _thresholdCollection.ReplaceOneAsync(x => x.ThreshId == ThreshId, threshold);
            return;

        }

        /// <summary>
        /// function to get data base on user input time
        /// </summary>
        /// <param name="upper"></param> is the boundary of time
        /// <param name="down"></param> is the boundary of time
        /// <returns></returns>
        public async Task<List<Metric>> GetTimeAsync(DateTime upper, DateTime lower)
        {
            return await _metricCollection.Find(x => x.Timestamp <= upper && x.Timestamp >= lower).ToListAsync();
        }


        public void WriteCsvToMemory(List<Metric> target)
        {
            var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
            {
                HasHeaderRecord = true,
                Delimiter = ",",
                Encoding = Encoding.UTF8
            };


            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (TextWriter tw = new StreamWriter(memoryStream))
                using (CsvWriter csv = new CsvWriter(tw, csvConfig))
                {
                    csv.WriteRecords(target);
                }
            }

        }




        public sealed class MetricMap : ClassMap<Metric>
        {
            public MetricMap()
            {
                Map(m => m.IpAddress).Name("IpAddress");
                Map(m => m.Timestamp).Name("Timestamp");
                References<CPUMap>(m => m.CPU_Utilization);
                References<MemMap>(m => m.Memory_Usage);
            }


        }
        public sealed class CPUMap : ClassMap<CPU_Utilization>
        {
            public CPUMap()
            {
                Map(m => m.User).Name("User");
                Map(m => m.System).Name("System");
                Map(m => m.Idle).Name("Idle");
                Map(m => m.Alert).Name("Alert");
            }
        }


        public sealed class MemMap : ClassMap<Memory_Usage>
        {
            public MemMap()
            {
                Map(m => m.GigabytesUsed);
                Map(m => m.AvailableMemory);
                Map(m => m.Alert).Name("Alert");
            }


        }
        public sealed class DiskMap : ClassMap<Disk>
        {
            public DiskMap()
            {
                Map(m => m.DiskName).Name("DiskName");
                Map(m => m.NumberOfOperations).Name("NumberOfOperations");
                Map(m => m.Latency).Name("Latency");
                Map(m => m.Alert).Name("Alert");
                References<DiskUseMap>(m => m.Disk_Utilization);
            }


        }
        public sealed class DiskUseMap : ClassMap<Disk_Utilization>
        {
            public DiskUseMap()
            {
                Map(m => m.Used).Name("Used_Space");
                Map(m => m.Available).Name("Available_Space");
            }


        }
    }
}
