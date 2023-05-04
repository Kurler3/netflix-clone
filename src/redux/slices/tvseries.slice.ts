import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit"
import { ITvSeries } from "../../types/tvseries.types"
import { TMDB_API_KEY, TMDB_API_URL } from "../../utils/constants";
import axios from "axios";

interface ITvSeriesResponse {
    popularTvSeries: ITvSeries[];
    comedyTvSeries: ITvSeries[];
}

export const fetchTvSeriesData = createAsyncThunk<ITvSeriesResponse, void>(
    'tvseries/fetchTvSeriesData',
    async (page: any) => {

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

        const getComedyTvSeriesPromise = axios.get(
            `${TMDB_API_URL}/discover/tv`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: 1,
                    with_genres: "comedy",
                    sort_by: "popularity.desc"
                }
            }
        )

        const results = await Promise.all([
            getPopularTvSeriesPromise,
            getComedyTvSeriesPromise
        ]); 

        return { 
            popularTvSeries: results[0].data.results, 
            comedyTvSeries: results[1].data.results,
        };
    }
);

/////////////////////////////////////
// DEFINE TV SERIES SLICE TYPE //////
/////////////////////////////////////

export type ITvSeriesSlice = {
    popularTvSeries: {
        currentPage: number;
        data: ITvSeries[] | null;
    };
    comedyTvSeries: {
        currentPage: number;
        data: ITvSeries[] | null;
    };
};

////////////////////////////////////
// DEFINE INITIAL STATE FOR SLICE //
////////////////////////////////////

const initialState: ITvSeriesSlice = {
    popularTvSeries: {
        currentPage: 1,
        data: null,
    },
    comedyTvSeries: {
        currentPage: 1,
        data: null,
    },
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
        builder.addCase(fetchTvSeriesData.fulfilled, (state, action) => {
          state.popularTvSeries.data = action.payload.popularTvSeries;
          state.comedyTvSeries.data = action.payload.comedyTvSeries;
        });
    },
});

//////////////////////////////////////
// EXPORT ACTIONS ////////////////////
//////////////////////////////////////

// export const {

// } = tvSeriesSlice.actions;

//////////////////////////////////////
// EXPORT REDUCER ////////////////////
//////////////////////////////////////

export default tvSeriesSlice.reducer;