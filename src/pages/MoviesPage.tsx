import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { getMoviesState } from "../redux/selectors/movies.selectors";
import MediaGrid from "../components/MediaGrid";
import HomePage from "./HomePage";



const MoviesPage = () => {

  const appDispatch = useAppDispatch();

  //////////////////////////////////////////
  // SELECTORS /////////////////////////////
  //////////////////////////////////////////

  const moviesState = useSelector(getMoviesState);

  //////////////////////////////////////////
  // FUNCTIONS /////////////////////////////
  //////////////////////////////////////////

  console.log(moviesState.movieGenres)

  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////


  return (
    <div className="relative">

      {/* CATEGORY FILTER */}


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