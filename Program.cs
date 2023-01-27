using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using SystemMonitor.Data;

using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using System.Net;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<MetricsDatabaseSettings>(builder.Configuration.GetSection("MetricsDatabaseSettings"));
builder.Services.AddSingleton<MetricsService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3001");

        });
});
var app = builder.Build();

app.UseCors("CORSPolicy");
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapGet("/", () => "Metrics API!!");


app.MapGet("/api/metrics/{ip}", async (MetricsService metricsService, string ip) => await metricsService.Get(ip));

app.MapGet("/api/metrics", async (MetricsService metricsService) => await metricsService.Get());

app.MapPost("/api/metrics/create", async (MetricsService metricsService, [FromBody] Metric metric)
    => await metricsService.Create(metric));



app.Run();

