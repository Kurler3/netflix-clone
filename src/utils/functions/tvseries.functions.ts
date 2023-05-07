/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { IGenre } from "../../types/common.types";
import { TV_SERIES_CARROUSEL_CATEGORIES } from "../constants";
import _ from "lodash";
import { ITvSeries } from "../../types/tvseries.types";
import { fetchGenresTvSeriesData } from "../../redux/actions/tvseries.actions";

interface IPropsFetchInitialTvSeriesData {
    tvGenres: IGenre[] | null;
    comedyTvSeries: ITvSeries[] | null;
    appDispatch: Dispatch<any>;
}

export const fetchInitialTvSeriesData = ( { tvGenres, comedyTvSeries, appDispatch }: IPropsFetchInitialTvSeriesData ) => {

    // IF GENRES ARE AVAILABLE => GET COMEDY + OTHER GENRES TV SERIES
    if(
        tvGenres && tvGenres.length > 0 &&
        comedyTvSeries === null
    ) {

        // CLOEN DEEP THE CARROUSEL CATEGORIES
        const missingCategories = _.cloneDeep(TV_SERIES_CARROUSEL_CATEGORIES);
  
        missingCategories.shift(); // remove "popular" category
  
        // GET IGenre Objects that are needed to fetch the tv series data
        const missingGenres = tvGenres.filter((genre) => {
  
          return missingCategories.find((category) => category.value === genre.name.toLowerCase());
        })  
  
        if(missingGenres.length > 0) {
            
            appDispatch(fetchGenresTvSeriesData(missingGenres));
        }
      }
}