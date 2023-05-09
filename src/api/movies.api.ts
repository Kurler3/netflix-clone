/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { IGenre, IGenreRequestParams } from "../types/common.types";
import { TMDB_API_KEY, TMDB_API_URL } from "../utils/constants";
import { IMoviesSearchRequestParams } from "../types/movie.types";


export class MoviesApi {

    static getMovieWithGenre = async (
        genre: IGenre,
        page?: number,
        language?: string,
    ) => {
        const params: IGenreRequestParams = {
            api_key: TMDB_API_KEY!,
            with_genres: `${genre.id}`,
            sort_by: "popularity.desc",
            language: "en-US",
        };

        if(page) params.page = page;
        if(language) params.language = language;

        const result = await axios.get(
            `${TMDB_API_URL}/discover/movie`,
            {
                params,
            }
        );

        return {
            data: result.data.results,
            genre: genre.name,
        };
    }

    
    static searchMoviesByTitle = async (
        title: string,
        page?: number,
    ) => {
        const params: IMoviesSearchRequestParams = {
            api_key: TMDB_API_KEY!,
            query: title,
        };

        if(page) params.page = page;

        const result = await axios.get(
            `${TMDB_API_URL}/search/movie`,
            {
                params,
            }
        );

        return result.data.results;
    }

}