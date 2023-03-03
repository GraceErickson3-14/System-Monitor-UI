using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using restapi.Models;
using restapi.Repository;
using restapi.Interface;
using System.IO;
using CsvHelper.Configuration;
using System.Globalization;
using System.Text;
using CsvHelper;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricController : Controller // controller class that handle the http request
    {
        //readoly var which represent the Imongodbservice interface here, which will connect to specific function in mongodbservice
        private readonly MongoDBService _mongoDBService;
        /// <summary>
        /// constructor
        /// pass the interface in, assign the interface to the readonly variable above.
        /// </summary>
        /// <param name="mongoDBService"></param>
        public MetricController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        /// <summary>
        /// Get route
        /// return every document in the collection
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<Metric>> Get()
        {
            return await _mongoDBService.GetAsync();
        }

        /// <summary>
        /// Get id route
        /// return the document that matches the id input
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Metric>> GetId(string id)
        {
            var target = await _mongoDBService.GetIdAsync(id);

            if (target is null)
            {
                return NotFound();
            }

            return target;
        }

        [HttpGet("record")]
        public async Task<ActionResult<List<Metric>>> GetTime(DateTime upper, DateTime lower)
        {
            var target = await _mongoDBService.GetTimeAsync(upper, lower);

            if (target is null)
            {
                return NotFound();
            }

            return target;
        }

        [HttpGet("csv")]
        public async Task<FileResult> GetTimeCsv(DateTime upper, DateTime lower)
        {
            var target = await _mongoDBService.GetTimeAsync(upper, lower);

            var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
            {
                HasHeaderRecord = true,
                Delimiter = ",",
                Encoding = Encoding.UTF8
            };

            using (MemoryStream memoryStream = new MemoryStream())
            {
                using (TextWriter tw = new StreamWriter(memoryStream))
                using (CsvWriter csv = new CsvWriter(tw, csvConfig))
                {
                    
                    csv.WriteRecords(target);
                    // memoryStream.Seek(0, SeekOrigin.Begin);
                }

                return File(memoryStream.ToArray(), "text/csv", "testname.csv");
            }

        }

        /// <summary>
        /// Post route
        /// create a new ducument to the collection
        /// </summary>
        /// <param name="metric"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Metric metric) // accept user payload from the body
        {
            if (metric.CPU.Utilization.User + metric.CPU.Utilization.Idle+ metric.CPU.Utilization.System != (double)100)
            {
                return BadRequest("CPU utilization data is wrong, doesn't add up to 100%");
            }
            else if (metric.Disk.Utilization.Used + metric.Disk.Utilization.Available != (double)100)
            {
                return BadRequest("Disk utilization data is wrong, Used and Available doesn't add up to 100%");
            }
            await _mongoDBService.CreateAsync(metric);
            return CreatedAtAction(nameof(Get), new { id = metric.IpAddress }, metric);
        }

       
    }
}
