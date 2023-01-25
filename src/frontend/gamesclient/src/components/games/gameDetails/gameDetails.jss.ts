import { createUseStyles } from "react-jss";

export const GameDetailsStyles = createUseStyles((theme: any) => ({
    container: {
        padding: '20px',
        boxSizing: 'border-box',
    },
    content: {
        display: "flex",
        rowGap: '10px',
        columnGap: '10px',
        boxSizing: 'border-box',
    },
    info: {

    },
    fieldTitle: {
        color: '#560BAD'
    },
    fieldValue: {

    },
    cover: {
        height: '256px'
    },
    screenshots: {
        display: "flex",
        flexFlow: "row wrap",
        rowGap: "10px",
        columnGap: "10px",
        padding: "10px",
        width: "100%",
        boxSizing: 'border-box',
        background: "#f7f7f7",
        border: "1px solid #3A0CA3",

        "& > *": {
            flex: '0 1 auto',
            maxHeight: '100px',
            width: '140px'
        }
    }
}));