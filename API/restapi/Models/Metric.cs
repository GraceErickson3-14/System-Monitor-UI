using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace restapi.Models
{
    public class Metric
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? ID { get; set; }  //should be IPaddress
        //public string? MacAddress { get; set; }

        [BsonDateTimeOptions(Representation = BsonType.Document)]
        public DateTime Timestamp { get; set; }

        public CPUUtilization CPUUtilization { get; set; }


        //public List<int>? MemoryUtilization { get; set; }
        //public List<float>? DiskUtilization { get; set; }


        /*public int UserCpu { get; set; }
        public int SystemCpu { get; set; }
        public int IdleCpu { get; set; }
        public int MemoryUsed { get; set; }
        public int MemoryAvail { get; set; }
        public int DiskUsed { get; set; }
        public int DiskAvail { get; set; }
        public int DiskOperationCount { get; set; }
        public int DiskLantency { get; set; }*/
    }
    public class CPUUtilization
    {
        public double user { get; set; }
        public double System { get; set; }
        public double Idle { get; set; }
    }

}
