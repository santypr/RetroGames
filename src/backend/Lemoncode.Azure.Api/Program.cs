using Microsoft.EntityFrameworkCore;
using Lemoncode.Azure.Api.Data;
using Lemoncode.Azure.Models.Configuration;
using Lemoncode.Azure.Api.Services;
using Lemoncode.Azure.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApiDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApiDBContext") ?? throw new InvalidOperationException("Connection string 'ApiDBContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        currentbuilder =>
        {
            currentbuilder.AllowAnyHeader()
                          .AllowAnyMethod()
                          .SetIsOriginAllowed(_ => true)
                          .AllowCredentials();
        });
});

builder.Services.AddOptions();
builder.Services.Configure<StorageOptions>(builder.Configuration.GetSection(nameof(Lemoncode.Azure.Models.Configuration.StorageOptions)));
builder.Services.AddSingleton<BlobService>();
builder.Services.Configure<ComputerVisionOptions>(builder.Configuration.GetSection(nameof(Lemoncode.Azure.Models.Configuration.ComputerVisionOptions)));
builder.Services.AddSingleton<IComputerVisionService, ComputerVisionService>();
builder.Services.Configure<BingSearchOptions>(builder.Configuration.GetSection(nameof(Lemoncode.Azure.Models.Configuration.BingSearchOptions)));
builder.Services.AddHttpClient<IBingSearchService, BingSearchService>();

var aiOptions = new Microsoft.ApplicationInsights.AspNetCore.Extensions.ApplicationInsightsServiceOptions();
aiOptions.ConnectionString = builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"];
aiOptions.DeveloperMode = true;
aiOptions.EnableDebugLogger = true;
builder.Services.AddApplicationInsightsTelemetry(aiOptions);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.MapHub<RatingHub>("/hub");
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
