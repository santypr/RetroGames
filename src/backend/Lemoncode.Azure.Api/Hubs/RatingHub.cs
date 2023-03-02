using Lemoncode.Azure.Api.Services;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace Lemoncode.Azure.Api.Hubs
{
    public class RatingHub : Hub
    {
        private readonly IHubContext<RatingHub> hubContext;
        private readonly IBingSearchService bingSearchService;

        public RatingHub(IHubContext<RatingHub> hubContext, IBingSearchService bingSearchService)
        {
            this.hubContext = hubContext;
            this.bingSearchService = bingSearchService;
        }

        //public Task NotifyAll(Notification notification) =>
        //    Clients.All.SendAsync("NotificationRecived", notification);

        //public async Task UserConnected(string user)
        //{
        //    await Clients.All.SendAsync("UserConnected", user);
        //}

        public async Task RateGame(int rating) => 
            await Clients.All.SendAsync("gameRated", rating);

        [HubMethodName("MyRateGame")]
        public async Task MyRateGame(Vote vote)
        {
            await Clients.Client(vote.ClientId).SendAsync("myGameRated", vote.Value);
        }

        public async Task SearchGame(SearchGame searchGame)
        {
            var searchResult = await bingSearchService.SearchAsync(searchGame.Value);
            await Clients.Client(searchGame.ClientId).SendAsync("gameSearched", JsonSerializer.Serialize(searchResult));
        }

    }
    public record Notification(string Text, DateTime Date);
    public record Vote(
        //string UserId,
        string ClientId,
        //string GroupId,
        int Value
    );

    public record SearchGame(
      //string UserId,
      string ClientId,
      //string GroupId,
      string Value
  );
}
