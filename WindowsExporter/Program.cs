﻿using System;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Net.Mime;
using System.Text;

class programMain
{
    private static HttpClient sharedClient = new()
    {
        BaseAddress = new Uri("https://localhost:7165/api/Metric"),
    };

    static async Task main(string[] args)
    {
        using (var httpClient = new HttpClient())
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://localhost:7165/api/Metric"),
            };
            request.Headers.Accept.ParseAdd("application/json");


            using (var response = await httpClient.SendAsync(request))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
            }
        }
    }

    static void Main(string[] args)
    {

        var client = new HttpClient();
        var response = client.GetAsync("http://localhost:9182/metrics").Result;
        var metricsData = response.Content.ReadAsStringAsync().Result;

        var lines = metricsData.Split('\n');



        foreach (var line in lines)
        {
            // windows_cpu_time_total Time that processor spent in different modes (idle, interrupt, privileged, user,dpc)
            if (line.StartsWith("windows_cpu_time_total"))
            {
                var newMetric = new Metric();

                if (line.Contains("mode=\"idle\""))
                {
                    newMetric.Names = "windows_cpu_time_total";
                    newMetric.Values = Regex.Match(line, @"\d+\.\d+").ToString();
                    newMetric.Modes = "idle";
                }
                else if (line.Contains("mode=\"dpc\""))
                {
                    newMetric.Names = "windows_cpu_time_total";
                    newMetric.Values = Regex.Match(line, @"\d+\.\d+").ToString();
                    newMetric.Modes = "dpc";
                }
                else if (line.Contains("mode=\"interrupt\""))
                {
                    newMetric.Names = "windows_cpu_time_total";
                    newMetric.Values = Regex.Match(line, @"\d+\.\d+").ToString();
                    newMetric.Modes = "interrupt";
                }
                else if (line.Contains("mode=\"user\""))
                {
                    newMetric.Names = "windows_cpu_time_total";
                    newMetric.Values = Regex.Match(line, @"\d+\.\d+").ToString();
                    newMetric.Modes = "user";
                }
                else if(line.Contains("mode=\"privileged\""))
                {
                    newMetric.Names = "windows_cpu_time_total";
                    newMetric.Values = Regex.Match(line, @"\d+\.\d+").ToString();
                    newMetric.Modes = "privileged";
                }
            }
            //windows_cs_physical_memory_bytes ComputerSystem.TotalPhysicalMemory
            else if(lines.Contains("windows_cs_physical_memory_bytes"))
            {
                var newCPUCstateSeconds = new windowsCsPhysicalMemorybyte();
                newCPUCstateSeconds.Value = double.Parse(Regex.Match(line, @"\d+(\.\d+)?([eE][+-]?\d+)?").ToString());
            }
            // windows_os_virtual_memory_bytes OperatingSystem.TotalVirtualMemorySize
            else if(lines.Contains("windows_os_virtual_memory_bytes"))
            {
                var newVirtual = new windowsOSVirtual();
                newVirtual.value = double.Parse(Regex.Match(line, @"\d+(\.\d+)?([eE][+-]?\d+)?").ToString());
            }
        //windows_cpu_cstate_seconds_total Time spent in low - power idle state
            else if(line.StartsWith("windows_cpu_cstate_seconds_total"))
            {
                var cpuCstate = new windowsCpuCstate();
                cpuCstate.Name = "windows_cpu_cstate_seconds_total";
                cpuCstate.state = Regex.Match(line, "(c\\d+)").ToString();
                if (cpuCstate.value != 0)
                {
                    cpuCstate.value = double.Parse(Regex.Match(line, @"\\d+\\.\\d+").ToString());
                }
                else 
                {
                    Match zeroValue = Regex.Match(line, @"\b0\b$"); 
                    if(zeroValue.Success)
                    {
                        cpuCstate.value = double.Parse(zeroValue.Value);
                    }
                }
            }
            else if (line.StartsWith("windows_logical_disk_size_bytes"))
            {
                var windowDiskBytes = new windowsSizeBytes();
                windowDiskBytes.Names = "windows_logical_disk_size_bytes";
                windowDiskBytes.Values = Regex.Match(line, @"\d+\.\d+([eE][-+]?\d+)?").ToString();
                windowDiskBytes.Volumes = Regex.Match(line, @"volume=""(.+?)""").ToString();
            }
            else if (line.StartsWith("windows_logical_disk_free_bytes"))
            {
                var windowDiskBytes = new windowsSizeBytes();
                windowDiskBytes.Names = "windows_logical_disk_size_bytes";
                windowDiskBytes.Values = Regex.Match(line, @"\d+\.\d+([eE][-+]?\d+)?").ToString();
                windowDiskBytes.Volumes = Regex.Match(line, @"volume=""(.+?)""").ToString();
            }
        }
    }
}