using Lemoncode.Azure.Models.Configuration;
using Microsoft.Azure.CognitiveServices.Search.WebSearch.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Lemoncode.Azure.Api.Services
{
    public interface IBingSearchService
    {
        Task<SearchResponse?> SearchAsync(string searchTerm);
    }

    public class BingSearchService : IBingSearchService
    {
        private readonly HttpClient client;

        public BingSearchService(HttpClient client, IOptions<BingSearchOptions> bingSearchOptionsSettings) 
        {
            if (string.IsNullOrWhiteSpace(bingSearchOptionsSettings.Value.SubscriptionKey))
            {
                throw new ArgumentException($"'{nameof(bingSearchOptionsSettings.Value.SubscriptionKey)}' cannot be null or whitespace.", nameof(bingSearchOptionsSettings.Value.SubscriptionKey));
            }

            if (string.IsNullOrWhiteSpace(bingSearchOptionsSettings.Value.Endpoint))
            {
                throw new ArgumentException($"'{nameof(bingSearchOptionsSettings.Value.Endpoint)}' cannot be null or whitespace.", nameof(bingSearchOptionsSettings.Value.Endpoint));
            }

            this.client = client;

            this.client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", bingSearchOptionsSettings.Value.SubscriptionKey);
            this.client.BaseAddress = new Uri(bingSearchOptionsSettings.Value.Endpoint);
        }
       

        public async Task<SearchResponse?> SearchAsync(string searchTerm)
        {
            var uriQuery = "?q=" + Uri.EscapeDataString(searchTerm);
            var responseString = await client.GetStringAsync(uriQuery);
            return JsonConvert.DeserializeObject<SearchResponse?>(responseString);
        }
    }
}
