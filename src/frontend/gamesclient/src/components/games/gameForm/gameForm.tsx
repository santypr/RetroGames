import { useEffect, useState } from "react";
import { useTheme } from "react-jss"
import { GameFormStyles } from "./gameForm.jss"
import { createGameAction } from "../../../redux/actions/games";
import RatingService from "../../../services/signalr";
import { IGame } from "../../../models/IGame";
import { useAppDispatch } from "../../../redux/hooks";

export const GameForm = () => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const styles = GameFormStyles({ ...theme });
    const [title, setTitle] = useState("");
    const { searchGameQuery } = RatingService;
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [searchResult, setSearchResult] = useState<any>(null);
    const [descriptionIndex, setDescriptionIndex] = useState(0);
    const [thumbnailIndex, setThumbnailIndex] = useState(0);

    const onChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(ev.target.value);
    };

    const handleSearch = () => {
        console.log(title);
        searchGameQuery(title);
    }

    const handleSave = () => {
        console.log('save');
        var game: IGame = { title: title, info: description, posterUrl: thumbnailUrl, rating: 0, genre: 'Action', ageGroup: "0", downloadUrl: '' };
        dispatch(createGameAction(game));
    }

    const handlePrevDescription = () => {
        console.log("Prev");
        if (descriptionIndex === 0) {
            setDescriptionIndex(searchResult.WebPages.Value.length - 1);
        } else {
            setDescriptionIndex(descriptionIndex - 1);
        }
    }

    const handleNextDescription = () => {
        console.log("Next: " + descriptionIndex);
        if (descriptionIndex === searchResult.WebPages.Value.length - 1) {
            setDescriptionIndex(0);
        } else {
            setDescriptionIndex(descriptionIndex + 1);
        }
    }

    const handlePrevThumbnail = () => {
        console.log("Prev");
        if (thumbnailIndex === 0) {
            setThumbnailIndex(searchResult.Images.Value.length - 1);
        } else {
            setThumbnailIndex(thumbnailIndex - 1);
        }
    }

    const handleNextThumbnail = () => {
        console.log("Next: " + descriptionIndex);
        if (thumbnailIndex === searchResult.Images.Value.length - 1) {
            setThumbnailIndex(0);
        } else {
            setThumbnailIndex(thumbnailIndex + 1);
        }
    }

    RatingService.setSearchGameResultEvent((result: string) => {
        const jsonResult = JSON.parse(result);
        console.log(jsonResult.WebPages.Value);
        setSearchResult(jsonResult);
    })

    useEffect(() => {
        if (searchResult) {
            setDescription(searchResult.WebPages.Value[descriptionIndex].Snippet);
            setThumbnailUrl(searchResult.Images.Value[thumbnailIndex].ThumbnailUrl);
        }
    }, [searchResult])

    useEffect(() => {
        if (searchResult) {
            setDescription(searchResult.WebPages.Value[descriptionIndex].Snippet);
        }
    }, [descriptionIndex])

    useEffect(() => {
        if (searchResult) {
            setThumbnailUrl(searchResult.Images.Value[thumbnailIndex].ThumbnailUrl);
        }
    }, [thumbnailIndex]);

    const descriptionPagination =
        searchResult ?
            <>
                <div className={styles.pagination}>
                    <button onClick={handlePrevDescription} className={styles.paginationButton}>&lt; Prev</button>
                    <button onClick={handleNextDescription} className={styles.paginationButton}>Next &gt;</button>
                </div>
            </>
            : <>Not ended</>;

    const thumbnailPagination =
        searchResult ?
            <>
                <div className={styles.pagination}>
                    <button onClick={handlePrevThumbnail} className={styles.paginationButton}>&lt; Prev</button>
                    <button onClick={handleNextThumbnail} className={styles.paginationButton}>Next &gt;</button>
                </div>
            </>
            : <>Not ended</>

    return (
        <>
            <section className={styles.container}>
                <div className={styles.field}>
                    <div className={styles.label}>Nombre del juego</div>
                    <input
                        className={styles.input}
                        type='text'
                        placeholder="Nombre"
                        onChange={onChangeTitle} />
                    <div className={styles.actions}>
                        <button
                            className={styles.search}
                            onClick={handleSearch}>
                            Buscar
                        </button>
                        <button
                            className={styles.search}
                            onClick={handleSave}
                            disabled={searchResult ? false : true}>
                            Guardar
                        </button>
                    </div>
                </div>
                <div className={styles.cognitiveResult}>
                    <div>
                        <div className={styles.label}>Carátula</div>
                        <img className={styles.poster} src={thumbnailUrl} alt='Imagen autocompletada por Bing' />
                        {thumbnailPagination}
                    </div>
                    <div>
                        <div className={styles.label}>Descripción</div>
                        <textarea
                            className={styles.textarea}
                            placeholder="Autorelleno por Bing Search"
                            value={description}
                            disabled />
                        {descriptionPagination}
                    </div>
                </div>
            </section>
        </>
    )
}