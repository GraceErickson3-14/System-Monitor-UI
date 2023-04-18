using MongoDB.Bson.Serialization.Attributes;
using sandbox2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class Metric
{
    [BsonId]
    public string? ipAddress { get; set; }
    public DateTime timestamp { get; set; }

    public CPU_Utilization cpU_Utilization { get; set; } = new CPU_Utilization();
    public Disk[] disk { get; set; } = new Disk[0];

    public Memory_Usage memory_Usage { get; set; } = new Memory_Usage();
}




