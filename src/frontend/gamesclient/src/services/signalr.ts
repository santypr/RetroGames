import * as signalR from "@microsoft/signalr";
import { IVote } from "../models/IVote";

const HubURL = process.env.REACT_APP_SIGNALR_RATING_URL;

class RatingService {
    private connection: signalR.HubConnection;
    static instance: RatingService;
    private registerVote: (e: any) => void;
    private registerMyVote: (e: any) => void;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(HubURL!)
            .withAutomaticReconnect()
            .build();
        this.connection.start()
            .catch(err => { document.write(err) });

        this.connection.on("gameRated", (value: string): void => {
            console.log('vote received: ' + value + ' :-)');
            this.registerVote(value);
        });
        this.connection.on("myGameRated", (value: string): void => {
            console.log('My vote received: ' + value + ' :-)');
            this.registerMyVote(value);
        });
        this.registerVote = () => { console.log('registerVote not defined')}
        this.registerMyVote = () => { console.log('registerMyVote not defined')}
    }
    
    public setRatingEvent = (ratingEvent: (e: any) => void) => {
        console.log("someone voted");
        this.registerVote = ratingEvent;
    }

    public setMyRatingEvent = (myRatingEvent: (e: any) => void) => {
        console.log("I voted");
        this.registerMyVote = myRatingEvent;
    }

    public rateGame = (value: number) => {
        this.connection.send("RateGame", value)
            .then(x => console.log(value + " stars voted"))
    }

    public myRateGame = (value: number) => {
        const vote: IVote = { 
            ClientId: this.connection.connectionId!,
            Value: value
        }
        this.connection.send("MyRateGame", vote)
            .then(x => console.log(value + " stars voted"))
    }

    public static getInstance(): RatingService {
        if (!RatingService.instance) {
            RatingService.instance = new RatingService();
        }
        return RatingService.instance;
    }
}

export default RatingService.getInstance();