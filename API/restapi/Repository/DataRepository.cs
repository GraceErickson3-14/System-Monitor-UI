using restapi.Interface;
using restapi.Models;
using System.Net;

namespace restapi.Repository
{
    public class DataRepository:IDataRepository
    {
        private readonly List<Data> datas = new()
        {
            new Data{IpAddress = "1.1.1",MacAddress="none",Timestamp = DateTimeOffset.UtcNow,UserCpu =10, SystemCpu =10,
            IdleCpu = 20, MemoryUsed = 90, MemoryAvail = 10, DiskAvail = 10, DiskUsed = 20, DiskOperationCount = 1, DiskLantency = 100},
            new Data{IpAddress = "1.1.2",MacAddress="none",Timestamp = DateTimeOffset.UtcNow,UserCpu =10, SystemCpu =10,
            IdleCpu = 30, MemoryUsed = 70, MemoryAvail = 10, DiskAvail = 20, DiskUsed = 20, DiskOperationCount = 1, DiskLantency = 100}
        };

        public ICollection<Data> GetDatas()
        {
            return datas;
        }

        public Data GetData(string IpAddress)
        {
            return datas.Where(data => data.IpAddress == IpAddress).SingleOrDefault();
        }
    }
}
