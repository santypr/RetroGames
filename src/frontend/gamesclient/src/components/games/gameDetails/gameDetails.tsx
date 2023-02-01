import { useTheme } from "react-jss";
import { IGame, IScreenshot } from "../../../models/IGame"
import { GameDetailsStyles } from "./gameDetails.jss";
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { gameByIdSelector } from "../../../redux/selectors/games";
import { Uploader } from "../../common/uploader/uploader";
import { useState, useEffect } from "react";
import { deleteGameAction, getGameAction } from "../../../redux/actions/games";
import { useNavigate } from "react-router-dom";
import RatingService from "../../../services/signalr";
import Rating from 'react-animated-rating';

export const GameDetails = () => {
    const theme = useTheme();
    const styles = GameDetailsStyles({ ...theme });
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const game: IGame = useAppSelector(gameByIdSelector(id))!;
    const navigate = useNavigate();
    const { rateGame, myRateGame } = RatingService;
    const [myRating, setMyRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [votes, setVote] = useState(0);
    const [totalRating, setTotalRating] = useState(0);

    RatingService.setRatingEvent((value: number) => {
        const voteCounter = votes + 1;
        const ratingSum = totalRating + value;
        const average = +(ratingSum / voteCounter).toFixed(2);

        setVote(voteCounter);
        setTotalRating(ratingSum);
        setAvgRating(average);
    })

    RatingService.setMyRatingEvent((value: number) => {
        setMyRating(value);
    })


    useEffect(() => {
        dispatch(getGameAction(id as string));
    }, [dispatch, id])

    const onDelete = (ev: React.MouseEvent<HTMLElement>) => {
        dispatch(deleteGameAction(id as string));
        navigate('/');
    }

    const onBack = (ev: React.MouseEvent<HTMLElement>) => {
        navigate('/');
    }

    const handleRating = (value: number) => {
        // setMyRating(value);
        rateGame(value);
        myRateGame(value);

        // const voteCounter = votes + 1;
        // const ratingSum = totalRating + value;
        // const average = +(ratingSum / voteCounter).toFixed(2);

        // setVote(voteCounter);
        // setTotalRating(ratingSum);
        // setAvgRating(average);
        // other logic
    }

    return (
        <>
            <section className={styles.container}>
                <div className={styles.content}>
                    <div>
                        <img className={styles.cover} src={game?.posterUrl} alt={game?.title} />
                        <Rating filled={myRating}
                            onChange={(value:number) => {handleRating(value)}}/>

                        <div>My last Vote: {myRating}</div>
                        <div>Votes: {votes}</div>
                        <div>Total: {totalRating}</div>
                        <div>Avg: {avgRating}</div>
                    </div>
                    <div>
                        <header><h1>{game?.title}</h1></header>
                        <div className={styles.fieldTitle}>Information</div>
                        <div className={styles.fieldValue}>{game?.info}</div>
                    </div>
                </div>
                <div className={styles.screenshots}>
                    {game?.screenshots?.map((item: IScreenshot, index: number) => {
                        return (
                            <img key={index}
                                src={item.thumbnailurl ? item.thumbnailurl : item.url}
                                alt={item.filename} />
                        )
                    })}
                </div>
                <div className={styles.actions}>
                    <div className={styles.action} onClick={onBack}>Volver</div>
                    <div className={styles.action} onClick={onDelete}>Eliminar</div>
                </div>
            </section>
            <div className={styles.uploaderZone}>
                <Uploader id={id!} />
            </div>
        </>
    )
}