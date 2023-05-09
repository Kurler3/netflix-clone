import { RootState } from "../store";


export const getPopularTvSeries = (state: RootState) => state.tvseries.popularTvSeries;

export const getComedyTvSeries = (state: RootState) => state.tvseries.comedyTvSeries;  

export const getSelectedTvSeriesGenre = (state: RootState) => state.tvseries.selectedTvGenre;  

export const getTvSeriesState = (state:RootState) => state.tvseries;

export const getSearchTvSeries = (state:RootState) => state.tvseries.searchTvSeries;