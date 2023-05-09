import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie.types';
import { IGenre } from '../../types/common.types';
import axios from 'axios';
import { TMDB_API_KEY, TMDB_API_URL } from '../../utils/constants';
import { MoviesApi } from '../../api/movies.api';



///////////////////////////////////////////////////
// FETCH INITIAL MOVIE DATA ///////////////////////
///////////////////////////////////////////////////

interface IInitialMovieDataResponse {
    popularMovies: IMovie[];
    movieGenres: IGenre[];
}

export const fetchInitialMovieData = createAsyncThunk<IInitialMovieDataResponse, void>(
    'movies/fetchInitialMovieData',
    async () => {

        const getPopularMoviesPromise = axios.get(
            `${TMDB_API_URL}/movie/popular`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                    page: 1,
                },
            },
        );

        const getMovieGenresPromise = axios.get(
            `${TMDB_API_URL}/genre/movie/list`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                    language: "en-US",
                }
            }
        );

        const results = await Promise.all([
            getPopularMoviesPromise,
            getMovieGenresPromise,
        ]);

        return {
            popularMovies: results[0].data.results,
            movieGenres: results[1].data.genres,
        };

    }
)


///////////////////////////////////////////////////
// FETCH MOVIES BY GENRE //////////////////////////
///////////////////////////////////////////////////

interface IMoviesByGenreResponse {
    genre: string;
    data: IMovie[];
}

export const fetchGenresMoviesData = createAsyncThunk<IMoviesByGenreResponse[], IGenre[]>(
    'movies/fetchGenresMoviesData',
    async (genres) => {

        const getGenreMoviesResults = await Promise.all(
            genres.map((genre) => {
                return MoviesApi.getMovieWithGenre(genre);
            })
        )

        return getGenreMoviesResults;

    }
)

/////////////////////////////////////////////////////////
// FETCH TV SERIES DATA BY GENRE + PAGE /////////////////
/////////////////////////////////////////////////////////

interface IFetchGenrePaginatedMoviesDataResponse {
    genre: string;
    data: IMovie[];
}

interface IFetchGenrePaginatedMoviesDataInput {
    page: number;
    genre: IGenre;
}

export const fetchGenrePaginatedMoviesData = createAsyncThunk<IFetchGenrePaginatedMoviesDataResponse, IFetchGenrePaginatedMoviesDataInput>(
    'tvseries/fetchGenrePaginatedMoviesData',
    async ({
        page,
        genre,
    }) => {
        return await MoviesApi.getMovieWithGenre(
            genre,
            page,
        )
    }
)

/////////////////////////////////////////////////////////
// SEARCH BY TITLE ///////////////////////////////////////
/////////////////////////////////////////////////////////

interface ISearchMoviesByTitleResponse {
    data: IMovie[];
    pageFetched: number;
}
interface ISearchMoviesByTitleInput {
    title: string;
    page?: number;
}

export const searchMoviesByTitle = createAsyncThunk<ISearchMoviesByTitleResponse,ISearchMoviesByTitleInput>(
    "movies/searchMoviesByTitle",
    async ({ title, page }) => {
        const data = await MoviesApi.searchMoviesByTitle(title, page);
        return {
            data: data,
            pageFetched: page ?? 1,
        }
    }
)