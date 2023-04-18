using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sandbox2
{
    public class CPU_Utilization
    {
        public double user { get; set; }
        public double system { get; set; }
        public double idle { get; set; }
        public string alert { get; set; }
    }
}
