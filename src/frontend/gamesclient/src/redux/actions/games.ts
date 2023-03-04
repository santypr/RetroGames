import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IGame } from "../../models/IGame";
// import { GamesApi } from "../../api/games";
// import { useGetPeopleQuery } from "../../api/people";
import { gamesReceived, 
    gameReceived, 
    setError, 
    setLoading, 
    gameDeleted,
    gameCreated } from "../reducers/games";
import { AppDispatch, AppThunk } from "../store"

const ApiURL = process.env.REACT_APP_API_URL;

export const getGamesActionToolkit = createAction(
    'games',
    function getGames() {
        setLoading(true);
        return (
            {
                payload: {
                }
            }
        )
    }
)

export const getGamesAction = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    fetch(ApiURL + 'games/')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            dispatch(gamesReceived(data));
        })
        .catch(error => {
            console.error('Error fetching data', error)
            dispatch(setError(error));
        })
        .finally(() => {
            // no hace falta porque si todo ha ido bien ya se ha hecho en el games received
            // dispatch(setLoading(false));
        })

    // try
    //     setLoading
    //     fetch1.disptahc

    //     fetch2.dispatch

    // catch
    //     setloading

}

export const getGameAction = (id: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    fetch(ApiURL + 'games/' + id)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            dispatch(gameReceived(data));
        })
        .catch(error => {
            console.error('Error fetching data', error)
            dispatch(setError(error));
        })
        .finally(() => {
        })
}

export const deleteGameAction = (id: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    fetch(ApiURL + 'games/' + id, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                return response.ok;
            }
            throw response;
        })
        .then(data => {
            dispatch(gameDeleted(id));
        })
        .catch(error => {
            console.error('Error removing data', error)
            dispatch(setError(error));
        })
        .finally(() => {
        })
}

export const createGameAction = (game: IGame): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const content = JSON.stringify(game);
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
    };
    axios.post(
        ApiURL + 'games', 
        content, 
        config).then((response) => {   
            console.log(response.data);
            game.id = response.data.id;
            dispatch(gameCreated(game));
        })

    // fetch(ApiURL + 'games', 
    //     { 
    //         method: 'POST', 
    //         body: content, 
    //         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'} 
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.ok;
    //         }
    //         throw response;
    //     })
    //     .then(data => {
    //         console.log(data);
    //         // dispatch(gameCreated(id));
    //     })
    //     .catch(error => {
    //         console.error('Error creating game', error)
    //         dispatch(setError(error));
    //     })
    //     .finally(() => {
    //     })
}

// event.preventDefault()
// const url = process.env.REACT_APP_API_URL + "Games/" + props.id + "/Screenshots/Upload";
// const formData = new FormData();
// formData.append('formFile', file!);
// formData.append('fileName', file!.name);
// const config = {
//   headers: {
//     'content-type': 'multipart/form-data',
//   },
// };
// axios.post(url, formData, config).then((response) => {
//   console.log(response.data);
// });
// }

export const GetAnalysisAction = (id: string, screenshotId: string): AppThunk => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    fetch(ApiURL + 'games/' + id + '/Screenshots/' + screenshotId + '/Analyze', { method: 'GET' })
        .then(response => {
            if (response.ok) {
                return response.ok;
            }
            throw response;
        })
        .then(data => {
            dispatch(gameDeleted(id));
        })
        .catch(error => {
            console.error('Error removing data', error)
            dispatch(setError(error));
        })
        .finally(() => {
        })
}