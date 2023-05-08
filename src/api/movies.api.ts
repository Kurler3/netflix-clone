import axios from "axios";
import { IGenre, IGenreRequestParams } from "../types/common.types";
import { TMDB_API_KEY, TMDB_API_URL } from "../utils/constants";


export class MoviesApi {

    static TMDB_MOVIE_API_URL = `${TMDB_API_URL}/discover/movie`;

    static getMovieWithGenre = async (
        genre: IGenre,
        page?: number,
        language?: string,
    ) => {
        const params: IGenreRequestParams = {
            api_key: TMDB_API_KEY,
            with_genres: `${genre.id}`,
            sort_by: "popularity.desc",
            language: "en-US",
        };

        if(page) params.page = page;
        if(language) params.language = language;

        const result = await axios.get(
            this.TMDB_MOVIE_API_URL,
            {
                params,
            }
        );

        return {
            data: result.data.results,
            genre: genre.name,
        };
    }

}