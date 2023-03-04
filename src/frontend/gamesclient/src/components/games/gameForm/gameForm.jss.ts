import { createUseStyles } from "react-jss";

export const GameFormStyles = createUseStyles((theme: any) => ({
    container: {
        padding: '20px',
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        rowGap: '20px'
    },
    field: {
        display: "flex",
        flexFlow: "column nowrap",
        // alignItems: "flex-start",
        rowGap: '10px',
    },
    label: {

    },
    input: {
        padding: '8px 12px',
        backgroundColor: theme.colors.games.form.input.background,
        border: '1px solid ' + theme.colors.games.form.input.border,
        borderRadius: '5px',
        fontSize: '18px'
    },
    textarea: {
        boxSizing: 'border-box',
        padding: '8px 12px',
        backgroundColor: theme.colors.games.form.input.background,
        border: '1px solid ' + theme.colors.games.form.input.border,
        borderRadius: '5px',
        fontSize: '18px',
        minHeight: '300px',
        width: '100%'
    },
    search: {
        padding: '8px 12px',
        backgroundColor: theme.colors.games.form.search.background,
        color: theme.colors.games.form.search.foreground,
        cursor: 'pointer',
        width: '200px',

        '&:hover': {
            backgroundColor: theme.colors.games.form.search.hover.background,
            color: theme.colors.games.form.search.hover.foreground,
        }
    },
    cognitiveResult: {
        display: 'flex',
        alignItems: "stretch",
        justifyItems: 'stretch',
        width: '100%',

        '& > *': {
            flex: '1 1 0px',
        }
    },
    poster: {
        display: 'block',
        height: '300px',
        maxHeight: '300px',
        // width: '300px',
        border: '1px solid blue',
        margin: '0 auto'
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px'
    },
    paginationButton: {
        padding: '12px',
        backgroundColor: theme.colors.games.form.search.background,
        color: theme.colors.games.form.search.foreground,
        fontSize: '23px',
        border: 'none',

        '&:hover': {
            backgroundColor: theme.colors.games.form.search.hover.background,
            color: theme.colors.games.form.search.hover.foreground,
        }
    }
}));