using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace restapi.Models
{
    /// <summary>
    /// Metric class represent the data model that needs to match with fields in database
    /// in this case, it matches with the template fields in the database
    /// </summary>
    public class Metric
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? IpAddress { get; set; }
        public DateTime Timestamp { get; set; }
        public CPU_Utilization CPU_Utilization { get; set; }
        public Memory_Usage Memory_Usage { get; set; }
        public Disk[] Disk { get; set; }

    }

    public class CPU_Utilization
    {
        public double User { get; set; }
        public double System { get; set; }
        public double Idle { get; set; }
        public string Alert { get; set; }
    }

    public class Memory_Usage
    {
        public double GigabytesUsed { get; set; }
        public double AvailableMemory { get; set; }
        public string Alert { get; set; }
    }

    public class Disk
    {
        public string DiskName { get; set; }
        public int NumberOfOperations { get; set; }
        public double Latency { get; set; }
        public string Alert { get; set; }
        public Disk_Utilization Disk_Utilization { get; set; }
    }

    public class Disk_Utilization
    {
        public double Used { get; set; }
        public double Available { get; set; }
    }

 


}
