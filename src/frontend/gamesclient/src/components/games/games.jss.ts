import { createUseStyles } from "react-jss";

export const GamesContainerStyles = createUseStyles((theme: any) => ({
    page: {
        padding: '20px'
    },
    healthCheckOk: {
        color: 'green',
        fontWeight: "bold"
    },
    healthCheckError: {
        color: 'red',
        fontWeight: "bold"
    },
    container: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "stretch",
        rowGap: "5px",
        columnGap: "10px",
        width: '100%',
        padding: '20px 0',

        '& > *': {
            flex: '1 1 250px'
        }
    },
    btnAddGame: {
        background: theme.colors.games.btnAdd.background,
        color: theme.colors.games.btnAdd.foreground,
        fontSize: '80px',
        textAlign: "center",
        verticalAlign: "middle",
        cursor: 'pointer',
        textDecoration: 'none',

        '&:hover': {
            background: theme.colors.games.btnAdd.hover.background,
            color: theme.colors.games.btnAdd.hover.foreground,
        }
    }
}));