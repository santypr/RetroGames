import { useTheme } from "react-jss";
import { IGame } from "../../../models/IGame"
import { GameStyles } from "./gameItem.jss";

interface IGameProps {
    game: IGame
}

export const Game = (props: IGameProps) => {
    const theme = useTheme();
    const styles = GameStyles({ ...theme });

    return (
        <>
            <article className={styles.game}>
                <div className={styles.bullet}>
                    <img className={styles.cover} 
                        src={props.game.posterUrl} 
                        alt={props.game.title} />
                </div>
                {props.game.title}
            </article>
        </>
    )
}

