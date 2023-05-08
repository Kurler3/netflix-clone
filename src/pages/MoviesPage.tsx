import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { getMoviesState } from "../redux/selectors/movies.selectors";
import MediaGrid from "../components/MediaGrid";
import HomePage from "./HomePage";
import { useCallback } from "react";
import { setSelectedMovieGenre } from "../redux/slices/movies.slice";
import CategoryFilter from "../components/CategoryFilter";
import { transformGenreName } from "../utils/functions/common.functions";
import { IMovie } from '../types/movie.types';
import { IGenre } from "../types/common.types";
import { fetchGenresMoviesData } from "../redux/actions/movies.actions";



const MoviesPage = () => {

  const appDispatch = useAppDispatch();

  //////////////////////////////////////////
  // SELECTORS /////////////////////////////
  //////////////////////////////////////////

  const moviesState = useSelector(getMoviesState);

  //////////////////////////////////////////
  // FUNCTIONS /////////////////////////////
  //////////////////////////////////////////

  const handleSelectMovieGenre = useCallback((selectedGenre: string) => {

    const transformedGenre = transformGenreName(selectedGenre);
  
    const movieData = (moviesState[`${transformedGenre}Movies` as keyof typeof moviesState]) as IMovie[] | null;

    // IF NULL => NEED TO FETCH
    if(!movieData) {

      const genre = moviesState.movieGenres?.find((genre) => genre.name === transformedGenre) as IGenre;

      appDispatch(fetchGenresMoviesData([genre]));

    }

    // SET SELECTED MVOIE GENRE IN STATE
    appDispatch(
      setSelectedMovieGenre(transformedGenre)
    )

  }, [appDispatch, moviesState]);

  const handleRemoveSelectedMovieGenre = useCallback(() => {
    appDispatch(setSelectedMovieGenre(null));
  }, [appDispatch]);

  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  return (
    <div className="relative">

      {/* CATEGORY FILTER */}
      <CategoryFilter 
        handleSelectGenre={handleSelectMovieGenre}
        handleRemoveSelectedGenre={handleRemoveSelectedMovieGenre}
        isTvSeries={false}
      />

      {/* IF NO FILTER => HOME PAGE */}
      {
        moviesState.selectedMovieGenre ? 
        <MediaGrid />
        :
        <HomePage isTvSeries={false}/>
      }

    </div>
  )
}

export default MoviesPage;