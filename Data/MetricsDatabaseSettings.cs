using System;
namespace SystemMonitor.Data
{
    public class MetricsDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string MetricsCollectionName { get; set; } = string.Empty;

    }
}
