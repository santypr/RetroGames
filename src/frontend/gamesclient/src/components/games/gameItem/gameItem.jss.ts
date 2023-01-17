import { createUseStyles } from "react-jss";
import { formatDiagnosticsWithColorAndContext } from "typescript";

export const GameStyles = createUseStyles((theme: any) => ({
    game: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "stretch",
        alignItems: "center",
        paddingRight: '20px',
        paddingLeft: '0',
        columnGap: '10px',
        color: '#190649',
        fontWeight: "bold",
        background: '#E2DCF8',
    },
    bullet: {
        boxSizing: 'border-box',
        height: '128px',
        borderLeft: '16px solid #3A0CA3',
        fontWeight: '500',
        fontSize: '10px'
    },
    cover: {
        height: '128px'
    }
}));