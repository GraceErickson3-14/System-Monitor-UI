using restapi.Models;

namespace restapi.Interface
{
    public interface IDataRepository
    {
        ICollection<Data> GetDatas();

        Data GetData(string IpAddress);
    }
}
