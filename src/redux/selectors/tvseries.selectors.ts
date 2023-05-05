import { RootState } from "../store";


export const getPopularTvSeries = (state: RootState) => state.tvseries.popularTvSeries;

export const getComedyTvSeries = (state: RootState) => state.tvseries.comedyTvSeries;  

export const getTvSeriesState = (state:RootState) => state.tvseries;