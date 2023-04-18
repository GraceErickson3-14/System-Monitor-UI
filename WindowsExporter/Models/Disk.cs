using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sandbox2
{
    public class Disk
    {
        public string alert { get; set; }
        public string diskName { get; set; }
        public int numberOfOperations { get; set; }
        public double latency { get; set; }
        public Disk_Utilization disk_Utilization { get; set; } = new Disk_Utilization();
    }




}
