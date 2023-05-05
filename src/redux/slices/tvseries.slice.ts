import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit"
import { ITvSeries } from "../../types/tvseries.types"
import { TMDB_API_KEY, TMDB_API_URL } from "../../utils/constants";
import axios from "axios";
import { IGenre } from "../../types/common.types";
import { TvSeriesApi } from "../../api/tvseries.api";

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
)

/////////////////////////////////////
// DEFINE TV SERIES SLICE TYPE //////
/////////////////////////////////////

export type ITvSeriesSlice = {
    popularTvSeries: ITvSeries[] | null;
    comedyTvSeries: ITvSeries[] | null;
    tvGenres: IGenre[] | null;
};

////////////////////////////////////
// DEFINE INITIAL STATE FOR SLICE //
////////////////////////////////////

const initialState: ITvSeriesSlice = {
    popularTvSeries: null,
    comedyTvSeries: null,
    tvGenres: null,
}

//////////////////////////////////////
// DEFINE SLICE //////////////////////
//////////////////////////////////////

export const tvSeriesSlice = createSlice({
    name: "tvseries",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        
        // INITIAL TV SERIES DATA FETCH
        builder.addCase(fetchTvSeriesData.fulfilled, (state, action) => {
          state.popularTvSeries = action.payload.popularTvSeries;
         
          let tvGenres = action.payload.tvGenres;

          if(tvGenres) {
            tvGenres = tvGenres.map((genre) => ({...genre, name: genre.name.toLowerCase()}))
          }

          state.tvGenres = tvGenres;

        });

        // GENRE TV SERIES DATA FETCH
        builder.addCase(fetchGenresTvSeriesData.fulfilled, (state, action) => {
            for(const fetchedGenreTvSeries of action.payload) {
                state[`${fetchedGenreTvSeries.genre}TvSeries` as keyof typeof state] = fetchedGenreTvSeries.data;        
            }
        })

    },
});

//////////////////////////////////////
// EXPORT ACTIONS ////////////////////
//////////////////////////////////////


//////////////////////////////////////
// EXPORT REDUCER ////////////////////
//////////////////////////////////////

export default tvSeriesSlice.reducer;