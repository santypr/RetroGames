using System.IO;
using Microsoft.Azure.WebJobs;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using static Lemoncode.Azure.Images.Helpers.ImageHelper;
using Microsoft.Extensions.Logging;

namespace Lemoncode.Azure.FxGames
{
    public class ScreenshotsFunctions
    {
        private readonly ILogger<ScreenshotsFunctions> logger;

        public ScreenshotsFunctions(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger<ScreenshotsFunctions>();
        }


        [FunctionName("ResizeImage")]
        public void Run(
            [BlobTrigger("screenshots/{folder}/{name}")] Stream image,
            [Blob("thumbnails/{folder}/{name}", FileAccess.Write)] Stream imageSmall,
            string name,
            string folder)
        {
            logger.LogInformation($"Screenshot = {name} in folder {folder}");
            IImageFormat format;

            using (Image<Rgba32> input = SixLabors.ImageSharp.Image.Load<Rgba32>(image, out format))
            {
                ResizeImage(input, imageSmall, ImageSize.Small, format);
            }
        }
    }
}
