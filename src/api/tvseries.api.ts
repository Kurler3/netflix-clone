/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { TMDB_API_KEY, TMDB_API_URL } from '../utils/constants';
import { IGenre, IGenreRequestParams } from "../types/common.types";
import { ITvSeriesSearchRequestParams } from "../types/tvseries.types";

export class TvSeriesApi {

    static getTvSeriesWithGenre = async (
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
            `${TMDB_API_URL}/discover/tv`,
            {
                params,
            }
        );

        return {
            data: result.data.results,
            genre: genre.name,
        };
    }   

    static searchTvSeriesByName = async (
        name: string,
        page?: number,
    ) => {
        const params: ITvSeriesSearchRequestParams = {
            api_key: TMDB_API_KEY!,
            query: name,
        };

        if(page) params.page = page;

        const result = await axios.get(
            `${TMDB_API_URL}/search/tv`,
            {
                params,
            }
        );

        return result.data.results;
    }

}