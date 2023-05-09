import { RootState } from "../store";


export const getMoviesState = (state:RootState) => state.movies;
export const getSearchMovies = (state:RootState) => state.movies.searchMovies;