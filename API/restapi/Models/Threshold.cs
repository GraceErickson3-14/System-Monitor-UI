using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;


namespace restapi.Models
{
    public class Threshold
    {
        [BsonId]
        public string? ThreshId { get; set; }
        public int diskUsage { get; set; }
        public int cpuUsage { get; set; }
        public int memoryUsage { get; set; }
    }
}
