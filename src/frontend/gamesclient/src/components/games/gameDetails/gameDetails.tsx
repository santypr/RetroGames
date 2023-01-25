import { useTheme } from "react-jss";
import { IGame, IScreenshot } from "../../../models/IGame"
import { GameDetailsStyles } from "./gameDetails.jss";
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { gameByIdSelector } from "../../../redux/selectors/games";
import { Uploader } from "../../common/uploader/uploader";
import { useEffect } from "react";
import { getGameAction } from "../../../redux/actions/games";

export const GameDetails = () => {
    const theme = useTheme();
    const styles = GameDetailsStyles({ ...theme });
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const game: IGame = useAppSelector(gameByIdSelector(id))!;

    useEffect(() => {
        dispatch(getGameAction(id as string));
    }, [dispatch])

    return (
        <>
            <section className={styles.container}>
                <div className={styles.content}>
                    <div><img className={styles.cover} src={game?.posterUrl} alt={game?.title} /></div>
                    <div>
                        <header><h1>{game?.title}</h1></header>
                        <div className={styles.fieldTitle}>Information</div>
                        <div className={styles.fieldValue}>{game?.info}</div>
                    </div>
                </div>
                <div>
                    <div className={styles.screenshots}>
                        {game?.screenshots?.map((item: IScreenshot, index: number) => {
                            return (
                                <img key={index} src={item.url} alt={item.filename} />
                            )
                        })}
                    </div>
                </div>
            </section>
            <div>
                <Uploader id={id!} />
            </div>
        </>
    )
}