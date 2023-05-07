import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGenre } from "../../types/common.types";
import { ITvSeries } from "../../types/tvseries.types";
import axios from "axios";
import { TMDB_API_KEY, TMDB_API_URL } from "../../utils/constants";
import { TvSeriesApi } from "../../api/tvseries.api";

/////////////////////////////////////////////////////////
// FETCH INITIAL TV SERIES DATA /////////////////////////
/////////////////////////////////////////////////////////

interface ITvSeriesResponse {
    popularTvSeries: ITvSeries[];
    tvGenres: IGenre[] | null;
}

export const fetchTvSeriesData = createAsyncThunk<ITvSeriesResponse, void>(
    'tvseries/fetchTvSeriesData',
    async () => {

        const getPopularTvSeriesPromise = axios.get(
            `${TMDB_API_URL}/tv/popular`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: 1,
                }
            }
        );

        const getTvGenresPromise = axios.get(
            `${TMDB_API_URL}/genre/tv/list`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                }
            }
        )    

        const results = await Promise.all([
            getPopularTvSeriesPromise,
            getTvGenresPromise
        ]); 

        return { 
            popularTvSeries: results[0].data.results, 
            tvGenres: results[1].data.genres,
        };
    }
);

/////////////////////////////////////////////////////////
// FETCH TV SERIES DATA BY GENRES ///////////////////////
/////////////////////////////////////////////////////////

interface IFetchGenreTvSeriesDataResponse {
    genre: string;
    data: ITvSeries[];
}

export const fetchGenresTvSeriesData = createAsyncThunk<IFetchGenreTvSeriesDataResponse[], IGenre[]>(
    'tvseries/fetchGenresTvSeriesData',
    async (genres: IGenre[]) => {
        const getGenreTvSeriesResults = await Promise.all(
            genres.map((genre) => {
                return TvSeriesApi.getTvSeriesWithGenre(genre);
            })
        )

        return getGenreTvSeriesResults;
    }
);

/////////////////////////////////////////////////////////
// FETCH TV SERIES DATA BY GENRE + PAGE /////////////////
/////////////////////////////////////////////////////////

interface IFetchGenrePaginatedTvSeriesDataResponse {
    genre: string;
    data: ITvSeries[];
}

interface IFetchGenrePaginatedTvSeriesDataInput {
    page: number;
    genre: IGenre;
}

export const fetchGenrePaginatedTvSeriesData = createAsyncThunk<IFetchGenrePaginatedTvSeriesDataResponse, IFetchGenrePaginatedTvSeriesDataInput>(
    'tvseries/fetchGenrePaginatedTvSeriesData',
    async ({
        page,
        genre,
    }) => {
        return await TvSeriesApi.getTvSeriesWithGenre(
            genre,
            page,
        )
    }
)

