﻿using Lemoncode.Azure.Models.Configuration;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Extensions.Options;
using System.IO;
using System.Security.Policy;

namespace Lemoncode.Azure.Api.Services
{
    public interface IComputerVisionService
    {
        Task<ImageAnalysis> AnalyzeImageAsync(string url);
        Task<ImageAnalysis> AnalyzeImageAsync(Stream stream);
        Task<ImageDescription> DescribeAsync(string url);
        Task<ImageDescription> DescribeAsync(Stream stream);
        Task<AdultInfo> GetAdultInfoAsync(string url);
        Task<AdultInfo> GetAdultInfoAsync(Stream stream);
        Task<TagResult> GetTagsAsync(string url);
        Task<TagResult> GetTagsAsync(Stream stream);
        Task<Stream> GetThumbnailAsync(string url, int width, int height, bool smartCropping = true);
        Task<Stream> GetThumbnailAsync(Stream stream, int width, int height, bool smartCropping = true);
    }

    public class ComputerVisionService : IComputerVisionService
    {
        private readonly ComputerVisionClient client;
        public ComputerVisionService(IOptions<ComputerVisionOptions> computerVisionOptionsSettings)
            : this(computerVisionOptionsSettings.Value.SubscriptionKey, computerVisionOptionsSettings.Value.Endpoint)
        {
        }
        public ComputerVisionService(string subscriptionKey, string endpoint)
        {
            client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(subscriptionKey))
            {
                Endpoint = endpoint
            };
        }

        public async Task<ImageAnalysis> AnalyzeImageAsync(string url) =>
            await client.AnalyzeImageAsync(url); 


        public async Task<ImageAnalysis> AnalyzeImageAsync(Stream stream) =>
            await client.AnalyzeImageInStreamAsync(stream);


        public async Task<ImageDescription> DescribeAsync(string url) =>
            await client.DescribeImageAsync(url);

        public async Task<ImageDescription> DescribeAsync(Stream stream) =>
            await client.DescribeImageInStreamAsync(stream);

        public async Task<AdultInfo> GetAdultInfoAsync(string url)
        {
            List<VisualFeatureTypes?> features = new()
            {
                VisualFeatureTypes.Adult
            };

            ImageAnalysis results = await client.AnalyzeImageAsync(url, visualFeatures: features);

            return results.Adult;
        }

        public async  Task<AdultInfo> GetAdultInfoAsync(Stream stream)
        {
            List<VisualFeatureTypes?> features = new()
            {
                VisualFeatureTypes.Adult
            };

            ImageAnalysis results = await client.AnalyzeImageInStreamAsync(stream, visualFeatures: features);

            return results.Adult;
        }

        public async Task<TagResult> GetTagsAsync(string url) =>
            await client.TagImageAsync(url);

        public async Task<TagResult> GetTagsAsync(Stream stream) =>
            await client.TagImageInStreamAsync(stream);

        public async Task<Stream> GetThumbnailAsync(string url, int width, int height, bool smartCropping = true) =>
            await client.GenerateThumbnailAsync(width, width, url, smartCropping);

        public async Task<Stream> GetThumbnailAsync(Stream stream, int width, int height, bool smartCropping = true) =>
            await client.GenerateThumbnailInStreamAsync(width, width, stream, smartCropping);
    }
}
