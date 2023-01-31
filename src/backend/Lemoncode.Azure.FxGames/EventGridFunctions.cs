// Default URL for triggering event grid function in the local environment.
// http://localhost:7071/runtime/webhooks/EventGrid?functionName={functionname}
using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;
using Azure.Messaging.EventGrid;
using Azure.Messaging.EventGrid.SystemEvents;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using System.Threading.Tasks;

namespace Lemoncode.Azure.FxGames
{
    public static class EventGridFunctions
    {
        [FunctionName("DeleteThumbnails")]
        public static async Task DeleteThumbnails([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log)
        {
            var deletedEvent = eventGridEvent.Data.ToObjectFromJson<StorageBlobDeletedEventData>();
            var storageConnection = Environment.GetEnvironmentVariable("AzureWebJobsGamesStorage");
            var blobName = GetBlobNameFromUrl(deletedEvent.Url);
            BlobClient blobClient = new BlobClient(
                    storageConnection,
                    "thumbnails",
                    blobName);

            await blobClient.DeleteAsync();

            log.LogDebug($"Deleted thumbnails: {blobName}");
        }

        private static string GetFolderFromUrl(string bloblUrl)
        {
            var urlParts = bloblUrl.Split('/');
            var folder = urlParts[urlParts.Length - 2];

            return folder;
        }

        private static string GetBlobNameFromUrl(string bloblUrl)
        {
            var uri = new Uri(bloblUrl);
            var blobClient = new BlobClient(uri);
            return blobClient.Name;
        }
    }
}
