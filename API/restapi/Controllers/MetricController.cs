using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using restapi.Models;
using restapi.Repository;
using restapi.Interface;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetricController : Controller // controller class that handle the http request
    {
        //readoly var which represent the Imongodbservice interface here, which will connect to specific function in mongodbservice
        private readonly IMongoDBService _mongoDBService;
        /// <summary>
        /// constructor
        /// pass the interface in, assign the interface to the readonly variable above.
        /// </summary>
        /// <param name="mongoDBService"></param>
        public MetricController(IMongoDBService mongoDBService)
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

        /// <summary>
        /// Post route
        /// create a new ducument to the collection
        /// </summary>
        /// <param name="metric"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Metric metric) // accept user payload from the body
        {
            await _mongoDBService.CreateAsync(metric);
            return CreatedAtAction(nameof(Get), new { id = metric.ID }, metric);
        }

       
    }
}
