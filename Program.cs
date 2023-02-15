using System;
using System.Net.Http;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Net;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Runtime.InteropServices;
using System.Text;
using Amazon.Runtime;
using System.Runtime.Intrinsics.Arm;


public class Metric
{
    public string Name { get; set; }
    public string Value { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        var mongodbClient = new MongoClient("mongodb+srv://Sebastian8234:Gengar8234@firstexample.9n23dsu.mongodb.net/test");
        var database = mongodbClient.GetDatabase("test1");

        var databaseColllection = database.GetCollection <Metric > ("example1");

        var client = new HttpClient();
        var response = client.GetAsync("http://localhost:9182/metrics").Result;
        var metricsData = response.Content.ReadAsStringAsync().Result;

        var lines = metricsData.Split('\n');

        var parsedData = new List<Metric>();

        foreach (var line in lines)
        {
            //windows_cpu_time_total Time that processor spent in different modes(idle, interrupt, user)
            if (line.StartsWith("windows_cpu_time_total"))
            {
                if (line.Contains("mode=\"idle\""))
                {
                  Console.WriteLine(line);
                  var metric = new Metric { Name = "windows_cpu_time_total", Value = line };
                  //parsedData.Add(line);
                  parsedData.Add(metric);
                }
                else if (line.Contains("mode=\"interrupt\""))
                {
                    Console.WriteLine(line);
                    var metric = new Metric { Name = "windows_cpu_time_total", Value = line };
                    parsedData.Add(metric);
                    //parsedData.Add(line);
                }
                else if(line.Contains("mode=\"user\""))
                {
                    Console.WriteLine(line);
                    var metric = new Metric { Name = "windows_cpu_time_total", Value = line };
                    parsedData.Add(metric);
                    //parsedData.Add(line);
                }

            }
            // windows_service_status The status of the service(Status)
            else if (line.StartsWith("windows_service_status"))
            {
                Console.WriteLine(line);
                var metric = new Metric { Name = "windows_service_status", Value = line };
                parsedData.Add(metric);
                //parsedData.Add(line);
            }
            else if (line.StartsWith("windows_logical_disk_size_bytes"))
            {
                Console.WriteLine(line);
                var metric = new Metric { Name = "windows_logical_disk_size_bytes", Value = line };
                parsedData.Add(metric);
                //parsedData.Add(line);
            }
            else if (line.StartsWith("windows_logical_disk_free_bytes"))
            {
                Console.WriteLine(line);
                var metric = new Metric { Name = "windows_logical_disk_free_bytes", Value = line };
                parsedData.Add(metric);

                //parsedData.Add(line);
            }
            else if (line.StartsWith("windows_logical_disk_size_bytes"))
            {
                Console.WriteLine(line);
                var metric = new Metric { Name = "windows_logical_disk_size_bytes", Value = line };
                parsedData.Add(metric);
                //parsedData.Add(line);
            }
            else if (line.StartsWith("windows_logical_disk_requests_queued"))
            {
                Console.WriteLine(line);
                var metric = new Metric { Name = "windows_logical_disk_requests_queued", Value = line };
                parsedData.Add(metric);
                // parsedData.Add(line);
            }
        }
        databaseColllection.InsertMany(parsedData);
        //var jsonData = JsonConvert.SerializeObject(parsedData, formatting: Formatting.Indented);
        //File.WriteAllText("parsedData.json", jsonData);
    }
}