
import {
  useSelector
} from "react-redux"
import { getTvSeriesState } from "../redux/selectors/tvseries.selectors";
import { TV_SERIES_CARROUSEL_CATEGORIES } from "../utils/constants";
import MediaCarrousel from "../components/MediaCarrousel";
import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { useEffect } from "react";
import { useAppDispatch } from '../redux/store';
import { fetchGenresTvSeriesData } from "../redux/slices/tvseries.slice";
import _ from "lodash";

const HomePage = () => {

  const appDispatch = useAppDispatch();

  //////////////////////////////
  // SELECTORS /////////////////
  //////////////////////////////

  const tvSeriesState = useSelector(getTvSeriesState)
  
  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  useEffect(() => {
    // IF GENRES ARE AVAILABLE => GET COMEDY + OTHER GENRES TV SERIES
    if(tvSeriesState.tvGenres && tvSeriesState.tvGenres.length > 0) {

      // CLOEN DEEP THE CARROUSEL CATEGORIES
      const missingCategories = _.cloneDeep(TV_SERIES_CARROUSEL_CATEGORIES);

      missingCategories.shift(); // remove "popular" category

      // GET IGenre Objects that are needed to fetch the tv series data
      const missingGenres = tvSeriesState.tvGenres.filter((genre) => {

        return missingCategories.find((category) => category.value === genre.name.toLowerCase());
      })  

      console.log("Missing Genres: ", missingGenres, missingCategories)

      if(missingGenres.length > 0) {

        appDispatch(fetchGenresTvSeriesData(missingGenres));
      }
    }

  }, [appDispatch, tvSeriesState.tvGenres]);

  console.log(tvSeriesState)

  return (
    <>

      {/* BIG BANNER */}


      {/* MAPPING TV CARROUSELS */}
      {
        TV_SERIES_CARROUSEL_CATEGORIES.map((carrouselCategory,index) => {

          return (
            <MediaCarrousel 
              key={`tv-series-carrousel-big-${index}-${carrouselCategory.value}`}
              mediaList={tvSeriesState[`${carrouselCategory.value}TvSeries` as keyof typeof tvSeriesState] as (IMovie[] | ITvSeries[] | null)}
              title={carrouselCategory.title}
            />
          )
        })
      }

      {/* POPULAR TV SERIES  */}
      

      {/* COMEDY TV SERIES */}

    </>
  )
}

export default HomePage;