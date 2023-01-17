import { createUseStyles } from "react-jss";
import { formatDiagnosticsWithColorAndContext } from "typescript";

export const GameDetailsStyles = createUseStyles((theme: any) => ({
    container: {
    },
    cover: {
        height: '128px'
    },
    screenshots: {
        display: "flex"
    }
}));