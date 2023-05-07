import {
    createSlice,
} from "@reduxjs/toolkit"
import { ITvSeries } from "../../types/tvseries.types"
import { IGenre } from "../../types/common.types";
import { fetchGenrePaginatedTvSeriesData, fetchGenresTvSeriesData, fetchTvSeriesData } from "../actions/tvseries.actions";
import { transformGenreName } from "../../utils/functions/common.functions";

/////////////////////////////////////
// DEFINE TV SERIES SLICE TYPE //////
/////////////////////////////////////

export type ITvSeriesSlice = {

    //////////////////////////
    // TV SERIES DATA ////////
    //////////////////////////

    popularTvSeries: ITvSeries[] | null;
    comedyTvSeries: ITvSeries[] | null;
    actionAdventureTvSeries: ITvSeries[] | null;
    animationTvSeries: ITvSeries[] | null;
    crimeTvSeries: ITvSeries[] | null;
    documentaryTvSeries: ITvSeries[] | null;
    dramaTvSeries: ITvSeries[] | null;
    scifiFantasyTvSeries: ITvSeries[] | null;

    //////////////////////////
    // REST //////////////////
    //////////////////////////

    tvGenres: IGenre[] | null;
    selectedTvGenre: string | null;
};

////////////////////////////////////
// DEFINE INITIAL STATE FOR SLICE //
////////////////////////////////////

const initialState: ITvSeriesSlice = {

    //////////////////////////
    // TV SERIES DATA ////////
    //////////////////////////

    popularTvSeries: null,
    comedyTvSeries: null,
    actionAdventureTvSeries: null,
    animationTvSeries: null,
    crimeTvSeries: null,
    documentaryTvSeries: null,
    dramaTvSeries: null,
    scifiFantasyTvSeries: null,

    //////////////////////////
    // REST //////////////////
    //////////////////////////

    tvGenres: null,
    selectedTvGenre: null,
}

//////////////////////////////////////
// DEFINE SLICE //////////////////////
//////////////////////////////////////

export const tvSeriesSlice = createSlice({
    name: "tvseries",
    initialState,
    reducers: {

        // SET SELECTED TV GENRE
        setSelectedTvGenre: (state, action) => {
            state.selectedTvGenre = action.payload;
        }

    },
    extraReducers: (builder) => {
        
        // INITIAL TV SERIES DATA FETCH
        builder.addCase(fetchTvSeriesData.fulfilled, (state, action) => {
          state.popularTvSeries = action.payload.popularTvSeries;
         
          let tvGenres = action.payload.tvGenres;

          if(tvGenres) {
            tvGenres = tvGenres.map((genre) => {

                const newGenreName = transformGenreName(genre.name.toLowerCase())

                return {
                    ...genre,
                    name: newGenreName
                }
            })
          }

          state.tvGenres = tvGenres;

        });

        // GENRE TV SERIES DATA FETCH
        builder.addCase(fetchGenresTvSeriesData.fulfilled, (state, action) => {
            for(const fetchedGenreTvSeries of action.payload) {
                (state[`${fetchedGenreTvSeries.genre}TvSeries` as keyof typeof state] as ITvSeries[]) = fetchedGenreTvSeries.data; 
            }
        })

        // PAGINATED GENRE TV SERIES
        builder.addCase(fetchGenrePaginatedTvSeriesData.fulfilled, (state, action) => {

            (state[`${action.payload.genre}TvSeries` as keyof typeof state] as ITvSeries[]).push(...action.payload.data);

        })

    },
});

//////////////////////////////////////
// EXPORT ACTIONS ////////////////////
//////////////////////////////////////

export const {
    setSelectedTvGenre
} = tvSeriesSlice.actions;

//////////////////////////////////////
// EXPORT REDUCER ////////////////////
//////////////////////////////////////

export default tvSeriesSlice.reducer;