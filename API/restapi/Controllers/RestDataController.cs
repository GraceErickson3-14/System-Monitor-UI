using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using restapi.Interface;
using restapi.Models;

namespace restapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestDataController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public RestDataController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        [ProducesResponseType(200,Type =typeof(IEnumerable<Data>))]
        public IActionResult GetDatas()
        {
            var datas = _dataRepository.GetDatas();
            return Ok(datas);
        }

        [HttpGet("{IpAddress}")]
        public Data GetData(string IpAddress)
        {
            var data = _dataRepository.GetData(IpAddress);
            return data;
        }
    }
}
