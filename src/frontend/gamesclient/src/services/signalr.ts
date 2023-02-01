import * as signalR from "@microsoft/signalr";

const HubURL = process.env.REACT_APP_SIGNALR_LIKES_HUB;

class RatingService {
    private connection: signalR.HubConnection;
    static instance: RatingService;
    // private countArmy: (e: any) => void;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(HubURL!)
            .withAutomaticReconnect()
            .build();
        this.connection.start()
            .catch(err => { document.write(err) });

        this.connection.on("UserConnected", (user: string): void => {
            console.log('New user connected: ' + user + ' :-)');
            // this.countArmy(user);
        });
        // this.countArmy = () => { console.log('countArmy not defined')}
    }
    public setRatingEvent = (ratingEvent: (e: any) => void) => {
        // this.countArmy = newUserEvent;
    }
    public rateGame = (value: number) => {
        this.connection.send("RateGame", value)
            .then(x => console.log(value + "stars voted"))
    }
    public static getInstance(): RatingService {
        if (!RatingService.instance) {
            RatingService.instance = new RatingService();
        }
        return RatingService.instance;
    }
}

export default RatingService.getInstance();