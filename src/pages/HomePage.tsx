/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  useSelector
} from "react-redux"
import { MOVIES_CARROUSEL_CATEGORIES, TV_SERIES_CARROUSEL_CATEGORIES } from "../utils/constants";
import MediaCarrousel from "../components/MediaCarrousel";
import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { useEffect, useMemo, useState } from "react";
import { RootState, useAppDispatch } from '../redux/store';
import BigBannerMedia from "../components/BigBannerMedia";
import { fetchInitialTvSeriesData } from "../utils/functions/tvseries.functions";
import { ITvSeriesSlice } from "../redux/slices/tvseries.slice";
import { IMoviesSlice } from "../redux/slices/movies.slice";
import { fetchCarrouselMovieData } from "../utils/functions/movies.functions";


interface IProps {
  isTvSeries: boolean;
}

const HomePage: React.FC<IProps> = ({
  isTvSeries,
}) => {

  //////////////////////////////
  // STATE /////////////////////
  //////////////////////////////

  const [hasFetched, setHasFetched] = useState(false);

  const appDispatch = useAppDispatch();



  //////////////////////////////
  // SELECTORS /////////////////
  //////////////////////////////

  const mediaState = useSelector((state: RootState) => isTvSeries ? state.tvseries : state.movies)

  ///////////////////////////////
  // VARIABLES //////////////////
  ///////////////////////////////

  const mediaBanner = useMemo(() => {
    if (isTvSeries) {
      return (mediaState as ITvSeriesSlice).popularTvSeries ? (mediaState as ITvSeriesSlice).popularTvSeries![0] : null;
    }
    return (mediaState as IMoviesSlice).popularMovies ? (mediaState as IMoviesSlice).popularMovies![0] : null;


  }, [isTvSeries, mediaState]);

  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  useEffect(() => {

    if (!hasFetched) {

      const readyToFetch = isTvSeries ? (mediaState as ITvSeriesSlice).tvGenres !== null : (mediaState as IMoviesSlice).movieGenres !== null;

      if (readyToFetch) {
        if (isTvSeries) {
          fetchInitialTvSeriesData({
            tvGenres: (mediaState as ITvSeriesSlice).tvGenres,
            comedyTvSeries: (mediaState as ITvSeriesSlice).comedyTvSeries,
            appDispatch
          });
        } else {
          fetchCarrouselMovieData({
            movieGenres: (mediaState as IMoviesSlice).movieGenres,
            comedyMovies: (mediaState as IMoviesSlice).comedyMovies,
            appDispatch,
          });
        }
        setHasFetched(true);
      }


    }



  }, [appDispatch, hasFetched, isTvSeries, mediaState]);

  return (
    <>

      {/* BIG BANNER */}

      <BigBannerMedia
        media={mediaBanner}
      />


      {/* MAPPING CARROUSELS */}

      {
        (isTvSeries ? TV_SERIES_CARROUSEL_CATEGORIES : MOVIES_CARROUSEL_CATEGORIES).map((carrouselCategory, index) => {

          return (
            <MediaCarrousel
              key={`tv-series-carrousel-big-${index}-${carrouselCategory.value}`}
              mediaList={mediaState[`${carrouselCategory.value}${isTvSeries ? "TvSeries" : "Movies"}` as keyof typeof mediaState] as (IMovie[] | ITvSeries[] | null)}
              title={carrouselCategory.title}
            />
          )
        })
      }

    </>
  )
}

export default HomePage;