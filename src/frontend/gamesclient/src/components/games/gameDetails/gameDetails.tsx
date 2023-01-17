import { useTheme } from "react-jss";
import { IGame } from "../../../models/IGame"
import { GameDetailsStyles } from "./gameDetails.jss";

interface GameDetailsProps {
    game: IGame
}
export const GameDetails = () => {
    const theme = useTheme();
    const styles = GameDetailsStyles({ ...theme });
    
    return (
        <>
        </>
    )
}