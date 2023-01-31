namespace restapi.Models
{
    /// <summary>
    /// used to store the appsettings.json file's MongoDB property values
    /// </summary>
    public class MongoDbSetting
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }
}
