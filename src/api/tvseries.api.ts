import axios from "axios";
import { ITvSeriesRequestParams } from "../types/tvseries.types";
import { TMDB_API_KEY, TMDB_API_URL } from '../utils/constants';
import { IGenre } from "../types/common.types";
import { transformGenreName } from "../utils/functions/common.functions";
export class TvSeriesApi {

    static TMDB_TV_API_URL = `${TMDB_API_URL}/discover/tv`

    static getTvSeriesWithGenre = async (
        genre: IGenre,
        page?: number,
        language?: string,
    ) => {

        const params: ITvSeriesRequestParams = {
            api_key: TMDB_API_KEY,
            with_genres: `${genre.id}`,
            sort_by: "popularity.desc",
            language: "en-US",
        };

        if(page) params.page = page;
        if(language) params.language = language;

        const result = await axios.get(
            this.TMDB_TV_API_URL,
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