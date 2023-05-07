import { useSelector } from "react-redux"
import { getTvSeriesState } from "../redux/selectors/tvseries.selectors"
import CategoryFilter from "../components/CategoryFilter";
import HomePage from "./HomePage";
import { useCallback } from "react";
import { transformGenreName } from "../utils/functions/common.functions";
import { ITvSeries } from "../types/tvseries.types";
import { useAppDispatch } from '../redux/store';
import { IGenre } from "../types/common.types";
import { setSelectedTvGenre } from "../redux/slices/tvseries.slice";

const TvSeriesPage = () => {

  const appDispatch = useAppDispatch();

  ///////////////////////////////////
  // SELECTORS //////////////////////
  ///////////////////////////////////

  const tvSeriesState = useSelector(getTvSeriesState)

  //////////////////////////////////////////
  // FUNCTIONS /////////////////////////////
  //////////////////////////////////////////

  const handleSelectTvGenre = useCallback((
      selectedGenre: string
  ) => {

    // GET TRANSFORMED GENRE NAME
    const transformedGenre = transformGenreName(selectedGenre);

    // GET THE DATA FROM THE TV SERIES STATE
    const tvSeriesData = (tvSeriesState[`${transformedGenre}TvSeries` as keyof typeof tvSeriesState]) as ITvSeries[] | null;

    // IF NULL => FETCH DATA
    if(!tvSeriesData) {

      // FIND THE GENRE
      const genre = tvSeriesState.tvGenres?.find(genre => genre.name === selectedGenre) as IGenre;

      console.log("Genre to fetch: ", genre)

      // DISPATCH FETCH GENRE TV SERIES ACTION
      // appDispatch(fetchGenresTvSeriesData([genre]))
    }

    console.log("Selected genre: ", selectedGenre)

    // SET THE SELECTED TV GENRE IN STATE
    appDispatch(
      setSelectedTvGenre(selectedGenre)
    )

  }, [appDispatch, tvSeriesState]);

  const handleRemoveSelectedTvGenre = useCallback(() => {

    appDispatch(setSelectedTvGenre(null));

  }, [appDispatch]);

  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  return (
    <div className="relative">

      {/* CATEGORY FILTER */}
      <CategoryFilter 
        handleSelectTvGenre={handleSelectTvGenre}
        handleRemoveSelectedTvGenre={handleRemoveSelectedTvGenre}
      />

      {/* IF NO FILTER => HOME PAGE */}
      {
        tvSeriesState.selectedTvGenre ?
        <div>Map selected genre tv series !</div>
        :
        <HomePage />
      }
      


    </div>
  )
}

export default TvSeriesPage