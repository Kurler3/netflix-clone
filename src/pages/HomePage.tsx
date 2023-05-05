
import {
  useSelector
} from "react-redux"
import { getTvSeriesState } from "../redux/selectors/tvseries.selectors";
import { IMAGE_TYPES, TMDB_IMAGE_API_URL, TV_SERIES_CARROUSEL_CATEGORIES } from "../utils/constants";
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


  return (
    <>

      {/* BIG BANNER */}
      {
        tvSeriesState.popularTvSeries && tvSeriesState.popularTvSeries.length > 0 && (

          <div className="min-w-full h-[700px]">
            <div className="relative w-full h-full">
              {/* POSTER */}
              <img 
                src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.original}/${tvSeriesState.popularTvSeries[1].poster_path}`}
                className="object-cover h-[800px] w-full object-left-top mask1"
              />
              {/* TEXT */}
              <div className="absolute flex flex-col justify-start items-start top-[30%] left-0 px-10"> 
                  {/* NAME */}
                  <h1 className="text-8xl">
                    {tvSeriesState.popularTvSeries[0].name}
                  </h1>
                  {/* OVERVIEW */}
                  <p className="max-w-[500px] mt-5">
                    {tvSeriesState.popularTvSeries[0].overview}
                  </p>
              </div>
            </div>  
          </div>

        )
      }

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