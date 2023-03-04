import { useTheme } from "react-jss";
import { IGame, IScreenshot } from "../../../models/IGame"
import { GameDetailsStyles } from "./gameDetails.jss";
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { gameByIdSelector } from "../../../redux/selectors/games";
import { Uploader } from "../../common/uploader/uploader";
import { useState, useEffect } from "react";
import { deleteGameAction, GetAnalysisAction, getGameAction } from "../../../redux/actions/games";
import { useNavigate } from "react-router-dom";
import RatingService from "../../../services/signalr";
import Rating from 'react-animated-rating';
import { setConstantValue } from "typescript";

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
    const [cognitiveResult, setCognitiveResult] = useState('');
    const [cognitiveThumbnail, setcognitiveThumbnail] = useState('');

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
        rateGame(value);
        myRateGame(value);
    }

    const fetchThumbnail = async (service: string) => {
        const gameId = game!.id!.toString();
        const screenshotId = game!.screenshots[0].id!.toString();
        // dispatch(GetAnalysisAction(gameId, screenshotId));   
        const ApiURL = process.env.REACT_APP_API_URL;
        var result = fetch(ApiURL + 'games/' + id + '/Screenshots/' + screenshotId + '/' + service + '?width=100&height=100&smartCropping=true', { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch(error => {
                console.error('Error removing data', error)
            })
            .finally(() => {
            })
        console.log('analysis');
        return result;
    }

    const fetchCognitive = async (service: string) => {
        const gameId = game!.id!.toString();
        const screenshotId = game!.screenshots[0].id!.toString();
        // dispatch(GetAnalysisAction(gameId, screenshotId));   
        const ApiURL = process.env.REACT_APP_API_URL;
        var result = fetch(ApiURL + 'games/' + id + '/Screenshots/' + screenshotId + '/' + service, { method: 'GET' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .catch(error => {
                console.error('Error removing data', error)
            })
            .finally(() => {
            })
        console.log('analysis');
        return result;
    }

    const handleAnalysys = async (ev: React.MouseEvent<HTMLElement>) => {
        var result = await fetchCognitive('Analyze');
        setCognitiveResult(result);
        console.log(result);
    }

    const handleTags = async (ev: React.MouseEvent<HTMLElement>) => {
        var result = await fetchCognitive('Tags');
        setCognitiveResult(result);
        console.log('tags');
    }

    const handleDescription = async (ev: React.MouseEvent<HTMLElement>) => {
        var result = await fetchCognitive('Describe');
        setCognitiveResult(result);
        console.log('description');
    }

    const handleThumbnail = async (ev: React.MouseEvent<HTMLElement>) => {
        var result = await fetchThumbnail('Thumbnail');
        setcognitiveThumbnail('data:image/png;base64,' + result.content);
        console.log('thumbnail',result.content );
    }

    const handleCensorship = async (ev: React.MouseEvent<HTMLElement>) => {
        var result = await fetchCognitive('AdultInformation');
        setCognitiveResult(result);
        console.log('censorship');
    }

    return (
        <>
            <section className={styles.container}>
                <div className={styles.content}>
                    <div>
                        <img className={styles.cover} src={game?.posterUrl} alt={game?.title} />
                        <Rating filled={myRating}
                            onChange={(value: number) => { handleRating(value) }} />

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
                    <div className={styles.action} onClick={handleAnalysys}>Análisis</div>
                    <div className={styles.action} onClick={handleTags}>Tags</div>
                    <div className={styles.action} onClick={handleDescription}>Description</div>
                    <div className={styles.action} onClick={handleThumbnail}>Thumbnail</div>
                    <div className={styles.action} onClick={handleCensorship}>¡¡Censura!!</div>
                </div>
                <div className={styles.actions}>
                    <img src={cognitiveThumbnail} />
                    {cognitiveResult! != null ? JSON.stringify(cognitiveResult): ''}
                </div>
            </section>
            <div className={styles.uploaderZone}>
                <Uploader id={id!} />
            </div>
        </>
    )
}