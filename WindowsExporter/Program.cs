using System;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Net.Mime;
using System.Text;
using System.Net.Http.Headers;
using System.Net;
using System.Net.Sockets;
using System.Text.Json;


namespace sandbox2 {
    class programMain
    {
        static async Task Main(string[] args)
        {
            var client = new HttpClient();
            var response = client.GetAsync("http://localhost:9182/metrics").Result;
            var metricsData = response.Content.ReadAsStringAsync().Result;
            Metric metric = new Metric();
            var lines = metricsData.Split('\n');


            // Get the Name of HOST
            string hostName = Dns.GetHostName();

            // Get the IP address
            IPAddress[] addresses = Dns.GetHostAddresses(hostName);
            string ipAddress = null;

            // Find the first IPv4 address
            foreach (IPAddress address in addresses)
            {
                if (address.AddressFamily == AddressFamily.InterNetwork)
                {
                    ipAddress = address.ToString();
                    metric.IpAddress = ipAddress;
  

                    break;
                }
            }
            int cpuUserCount = 0;
            int cpuIdleCount = 0;
            int cpuInterruptCount = 0;
            int cpuTotalCount = 1;

            foreach (var line in lines)
            {
                if (line.Contains("mode=\"idle\"") || line.Contains("mode=\"user\"") || line.Contains("mode=\"interrupt\""))
                {
                    if (line.Contains("mode=\"idle\"")) cpuIdleCount++;
                    if (line.Contains("mode=\"user\"")) cpuUserCount++;
                    if (line.Contains("mode=\"interrupt\"")) cpuInterruptCount++; // add values 
                    if (lines.Contains("mode=\"dpc\"")) cpuInterruptCount++;
                    if (line.Contains("mode=\"interrupt\"")) cpuInterruptCount++;

                    cpuTotalCount = cpuUserCount + cpuIdleCount + cpuInterruptCount;
          

                }
                if (line.Contains("windows_cs_physical_memory_bytes"))
                {
                    if (!line.StartsWith("# HELP") && !line.StartsWith("# TYPE"))
                    {
                        metric.memory_Usage.gigabytesUsed = double.Parse(Regex.Match(line, @"^windows_cs_physical_memory_bytes\s+([\d.]+(?:[eE][+-]?\d+)?)").Groups[1].Value);


                    }
                }
                if (line.Contains("windows_os_physical_memory_free_bytes"))
                {
                    if (!line.StartsWith("# HELP") && !line.StartsWith("# TYPE"))
                    {
                        metric.memory_Usage.gigabytesUsed = double.Parse(Regex.Match(line, @"^windows_os_physical_memory_free_bytes\s+([\d.]+(?:[eE][+-]?\d+)?)").Groups[1].Value);
                    }
                }
                for (int i = 0; i < metric.disk.Length; i++)
                {
                    if (line.Contains("windows_logical_disk_free_bytes"))
                    {
                        if (!lines[i].StartsWith("# HELP") && !lines[i].StartsWith("# TYPE"))
                        {
                            string availableValue = Regex.Match(lines[i], @"windows_logical_disk_free_bytes{[^}]+} (?<value>[\d.]+(?:[eE][+-]?\d+)?)").Groups["value"].Value;
                            double available;
                            if (double.TryParse(availableValue, out available))
                            {
                                metric.disk[i].disk_Utilization.available = available;
                            }
                        }
                    }

                    if (line.Contains("windows_logical_disk_size_bytes"))
                    {
                        if (!lines[i].StartsWith("# HELP") && !lines[i].StartsWith("# TYPE"))
                        {
                            string usedValue = Regex.Match(lines[i], @"windows_logical_disk_size_bytes{volume=""(?<volume>[^""]+)""} (?<value>[\d.]+(?:[eE][+-]?\d+)?)").Groups["value"].Value;
                            double used;
                            if (double.TryParse(usedValue, out used))
                            {
                                metric.disk[i].disk_Utilization.used = used;
                                metric.disk[i].disk_Utilization.available = metric.disk[i].disk_Utilization.available - metric.disk[i].disk_Utilization.used;
                            }
                        }
                    }

                    if (line.Contains("windows_logical_disk_read_latency_seconds_total"))
                    {
                        if (!lines[i].StartsWith("# HELP") && !lines[i].StartsWith("# TYPE"))
                        {
                            metric.disk[i].latency = double.Parse(Regex.Match(lines[i], @"windows_logical_disk_read_latency_seconds_total{volume=""[^""]+""}\s+([\d.]+)").Groups[1].Value);
                        }
                    }

                    if (line.Contains("windows_logical_disk_writes_total"))
                    {
                        if (!lines[i].StartsWith("# HELP") && !lines[i].StartsWith("# TYPE"))
                        {
                            metric.disk[i].numberOfOperations = Convert.ToInt32(double.Parse(Regex.Match(lines[i], @"windows_logical_disk_writes_total{volume=""([^""]+)""}\s+([\d.]+)").Groups[2].Value));
                        }
                    }
                    if (line.Contains("windows_logical_disk_writes_total") || line.Contains("windows_logical_disk_read_latency_seconds_total") || line.Contains("windows_logical_disk_size_bytes")
                        || line.Contains("windows_logical_disk_free_bytes"))
                    {
                        metric.disk[i].diskName = Regex.Match(line, @"(?<=volume="")[^""]+(?="")").Value;
                     
                    }


                }


                var newMetric = new Metric
                {
                    Id = metric.Id,
                    IpAddress = ipAddress,
                    timestamp = DateTime.UtcNow,
                    cpU_Utilization = new CPU_Utilization
                    {
                        user = (double)cpuUserCount / cpuTotalCount * 100,
                        idle = (double)cpuIdleCount / cpuTotalCount * 100,
                        system = (double)cpuInterruptCount / cpuTotalCount * 100,
                        alert = "Alert"
                    },
                    memory_Usage = new Memory_Usage
                    {
                        gigabytesUsed = metric.memory_Usage.gigabytesUsed,
                        availableMemory = metric.memory_Usage.availableMemory,
                        alert = "Alert2"
                    },
                    disk = new Disk[metric.disk.Length]
                };

                for (int l = 0; l < metric.disk.Length; l++)
                {
                    newMetric.disk[l] = new Disk
                    {
                        diskName = metric.disk[l].diskName,
                        numberOfOperations = metric.disk[l].numberOfOperations,
                        latency = metric.disk[l].latency,
                        alert = "Alert3",
                        disk_Utilization = new Disk_Utilization
                        {
                            used = metric.disk[l].disk_Utilization.used,
                            available = metric.disk[l].disk_Utilization.available
                        }
                    };
                }


                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    IgnoreNullValues = true,
                    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                    NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals
                };
                var json = System.Text.Json.JsonSerializer.Serialize(newMetric, options);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response1 = await client.PostAsync("https://localhost:7165/api/Metric", content);
                var responseString = await response1.Content.ReadAsStringAsync();


              
            }
        }
    }
}