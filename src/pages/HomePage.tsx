
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
import BigBannerMedia from "../components/BigBannerMedia";
import { fetchInitialTvSeriesData } from "../utils/functions/tvseries.functions";

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

    fetchInitialTvSeriesData({
      tvGenres: tvSeriesState.tvGenres,
      comedyTvSeries: tvSeriesState.comedyTvSeries,
      appDispatch
    });

  }, [appDispatch, tvSeriesState.comedyTvSeries, tvSeriesState.popularTvSeries, tvSeriesState.tvGenres]);

  return (
    <>

      {/* BIG BANNER */}
      {
        tvSeriesState.popularTvSeries && tvSeriesState.popularTvSeries.length > 0 && (

          <BigBannerMedia 
            media={tvSeriesState.popularTvSeries[0]}
          />

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

    </>
  )
}

export default HomePage;