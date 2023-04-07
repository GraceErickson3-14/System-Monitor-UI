namespace restapi.Models
{
    /// <summary>
    /// used to store the appsettings.json file's MongoDB property values
    /// </summary>
    public class MongoDbSetting
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionNameA { get; set; } = null!;

        public string CollectionNameB { get; set; } = null!;
    }
}
