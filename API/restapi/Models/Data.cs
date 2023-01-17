namespace restapi.Models
{
    public class Data
    {
        public string IpAddress { get; set; } = "";
        public string MacAddress { get; set; } = "";
        public DateTimeOffset Timestamp { get; set; }
        public int UserCpu{ get; set; }
        public int SystemCpu { get; set; }
        public int IdleCpu { get; set; }
        public int MemoryUsed { get; set; }
        public int MemoryAvail { get; set; }
        public int DiskUsed { get; set; }
        public int DiskAvail { get; set; }
        public int DiskOperationCount { get; set; }
        public int DiskLantency { get; set; }


    }
}
