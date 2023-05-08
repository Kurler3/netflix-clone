import { createSlice } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie.types';
import { IGenre } from '../../types/common.types';
import { fetchGenresMoviesData, fetchInitialMovieData } from '../actions/movies.actions';
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