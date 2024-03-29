import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie.types';
import { IGenre } from '../../types/common.types';
import { fetchGenrePaginatedMoviesData, fetchGenresMoviesData, fetchInitialMovieData, searchMoviesByTitle } from '../actions/movies.actions';
import { transformGenreName } from '../../utils/functions/common.functions';


/////////////////////////////////////
// DEFINE MOVIES SLICE TYPE /////////
/////////////////////////////////////

export type IMoviesSlice = {

    //////////////////////////////////////
    // INITIAL DATA //////////////////////
    //////////////////////////////////////

    popularMovies: IMovie[] | null;
    movieGenres: IGenre[] | null;

    //////////////////////////////////////
    // GENRE MOVIES //////////////////////
    //////////////////////////////////////

    comedyMovies:  IMovie[] | null;
    actionMovies: IMovie[] | null;
    adventureMovies:IMovie[] | null;
    animationMovies: IMovie[] | null;
    crimeMovies: IMovie[] | null;
    documentaryMovies: IMovie[] | null;
    dramaMovies: IMovie[] | null;
    horrorMovies: IMovie[] | null;
    romanceMovies: IMovie[] | null;

    //////////////////////////////////////
    // SEARCH DATA ///////////////////////
    //////////////////////////////////////

    searchMovies: IMovie[] | null;

    //////////////////////////////////////
    // OTHERS ////////////////////////////
    //////////////////////////////////////

    selectedMovieGenre: string | null;
};

////////////////////////////////////
// DEFINE INITIAL STATE FOR SLICE //
////////////////////////////////////

const initialState: IMoviesSlice = {

    ///////////////////////////////////
    // INITIAL DATA ///////////////////
    /////////////////////////////////// 

    popularMovies: null,
    movieGenres: null,
    
    ///////////////////////////////////
    // GENRE MOVIES ///////////////////
    ///////////////////////////////////

    comedyMovies: null,
    actionMovies: null,
    adventureMovies:null,
    animationMovies: null,
    crimeMovies: null,
    documentaryMovies: null,
    dramaMovies: null,
    horrorMovies: null,
    romanceMovies: null,

    //////////////////////////////////////
    // SEARCH DATA ///////////////////////
    //////////////////////////////////////

    searchMovies: null,

    ///////////////////////////////////
    // OTHERS /////////////////////////
    ///////////////////////////////////

    selectedMovieGenre: null,
    
};

//////////////////////////////////////
// DEFINE SLICE //////////////////////
//////////////////////////////////////

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        setSelectedMovieGenre: (state, action) => {

            state.selectedMovieGenre = action.payload;

        }

    },
    extraReducers: (builder) => {

        ////////////////////////////////////////////////////
        // INITIAL MOVIE DATA FETCH ////////////////////////
        ////////////////////////////////////////////////////

        builder.addCase(fetchInitialMovieData.fulfilled, (state, action) => {
            state.popularMovies = action.payload.popularMovies;

            let movieGenres = action.payload.movieGenres;

            if(movieGenres) {
                movieGenres = movieGenres.map((genre) => {

                    return {
                        ...genre,
                        name: transformGenreName(genre.name.toLowerCase())
                    }

                })
            }

            state.movieGenres = movieGenres;
        })

        /////////////////////////////////////////////////////
        // GENRE MOVIES FETCH ///////////////////////////////
        /////////////////////////////////////////////////////

        builder.addCase(fetchGenresMoviesData.fulfilled, (state, action) => {

            for(const fetchedGenreTvSeries of action.payload) {
                (state[`${fetchedGenreTvSeries.genre}Movies` as keyof typeof state] as IMovie[]) = fetchedGenreTvSeries.data; 
            }

        })


        /////////////////////////////////////////////////////
        // GENRE + PAGE MOVIES FETCH ////////////////////////
        /////////////////////////////////////////////////////

        builder.addCase(fetchGenrePaginatedMoviesData.fulfilled, (state, action) => {

            
            (state[`${action.payload.genre}Movies` as keyof typeof state] as IMovie[]).push(...action.payload.data);

        })

        /////////////////////////////////////////////////////
        // SEARCH BY NAME ///////////////////////////////////
        /////////////////////////////////////////////////////

        builder.addCase(searchMoviesByTitle.fulfilled, (state, action) => {

            if(action.payload.pageFetched === 1) {
                state.searchMovies = action.payload.data;
            } else {
                state.searchMovies?.push(...action.payload.data);
            }

        })

    }
});

//////////////////////////////////////
// EXPORT ACTIONS ////////////////////
//////////////////////////////////////

export const {
    setSelectedMovieGenre
} = moviesSlice.actions;

//////////////////////////////////////
// EXPORT REDUCER ////////////////////
//////////////////////////////////////

export default moviesSlice.reducer;