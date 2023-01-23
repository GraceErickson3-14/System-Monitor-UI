using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using restapi.Services;
using restapi.Models;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricController : Controller
    {
        private readonly MongoDBService _mongoDBService;
        public MetricController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet]
        public async Task<List<Metric>> Get()
        {
            return await _mongoDBService.GetAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Metric metric)
        {
            await _mongoDBService.CreateAsync(metric);
            return CreatedAtAction(nameof(Get), new { id = metric.ID }, metric);
        }

       
    }
}
