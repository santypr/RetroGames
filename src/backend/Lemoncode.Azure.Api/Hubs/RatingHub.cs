using Microsoft.AspNetCore.SignalR;

namespace Lemoncode.Azure.Api.Hubs
{
    public class RatingHub : Hub
    {
        private readonly IHubContext<RatingHub> hubContext;

        public RatingHub(IHubContext<RatingHub> hubContext)
        {
            this.hubContext = hubContext;
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

    }
    public record Notification(string Text, DateTime Date);
    public record Vote(
        //string UserId,
        string ClientId,
        //string GroupId,
        int Value
    );
}
