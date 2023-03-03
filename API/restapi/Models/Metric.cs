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
        public string IpAddress { get; set; }
        public DateTime Timestamp { get; set; }
        public CPU CPU { get; set; }
        public Memory Memory { get; set; }
        public Disk Disk { get; set; }

    }

    public class CPU
    {
        public CPU_Utilization Utilization { get; set; }
    }

    public class CPU_Utilization
    {
        public double User { get; set; }
        public double System { get; set; }
        public double Idle { get; set; }
    }

    public class Memory
    {
        public Usage Usage { get; set; }
    }

    public class Usage
    {
        public double GigabytesUsed { get; set; }
        public double AvailableMemory { get; set; }
    }

    public class Disk
    {
        public Disk_Utilization Utilization { get; set; }
        public int NumberOfOperations { get; set; }
        public double Latency { get; set; }
    }

    public class Disk_Utilization
    {
        public double Used { get; set; }
        public double Available { get; set; }
    }

 


}
