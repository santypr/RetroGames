using System;
using System.IO;
using System.Reflection.Metadata;
using System.Text.Json.Nodes;
using Lemoncode.Azure.Images.Helpers;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using static System.Net.Mime.MediaTypeNames;
using static Lemoncode.Azure.Images.Helpers.ImageHelper;

namespace Lemoncode.Azure.Fx
{
    public class StorageFunctions
    {
        private readonly ILogger logger;

        public StorageFunctions(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger<StorageFunctions>();
        }

        //[Function("MoveFile")]
        //[BlobOutput("fxout/{name}.txt")]
        //public static string MoveFiles(
        //    [BlobTrigger("fxin/{name}.txt", Connection = "AzureWebJobsStorage")] string myTriggerBlob,
        //    FunctionContext context,
        //    string name)
        //{
        //    var logger = context.GetLogger("BlobFunction");
        //    logger.LogInformation($"Triggered Item = {myTriggerBlob}");

        //    // Blob Output
        //    return myTriggerBlob;
        //}

        //[Function("SaveQueueMessage")]
        //[QueueOutput("testqueue")]
        //public static string SaveQueueMessage(
        //    [BlobTrigger("fxin/{name}.gif", Connection = "AzureWebJobsStorage")] string myTriggerBlob,
        //    FunctionContext context,
        //    string name)
        //{
        //    var logger = context.GetLogger("BlobFunction");
        //    logger.LogInformation($"Triggered Item = {myTriggerBlob}");

        //    return "Metiendo un mensaje en la cola";
        //}


        [Function("ResizeScreenshot")]
        [BlobOutput("screenshots/{folder}/thumbnails/{name}")]
        public static Stream ResizeScreenshot(
            [BlobTrigger("screenshot/{folder}/{name}", Connection = "AzureWebJobsStorage")] string image,
            FunctionContext context,
            string name)
        {
            var logger = context.GetLogger("BlobFunction");
            logger.LogInformation($"Triggered Item = {image}");
            IImageFormat format;
            Stream thumbnail = new MemoryStream();

            using (Image<Rgba32> input = SixLabors.ImageSharp.Image.Load<Rgba32>(image, out format))
            {
                ImageHelper.ResizeImage(input, thumbnail, ImageSize.Small, format);
            }

            return thumbnail;
        }
    }
}
