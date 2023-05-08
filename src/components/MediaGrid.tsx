/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSelector } from "react-redux"
import { getTvSeriesState } from "../redux/selectors/tvseries.selectors"
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITvSeries } from "../types/tvseries.types";
import MediaItemCard from "./MediaItemCard";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchGenrePaginatedTvSeriesData } from "../redux/actions/tvseries.actions";
import { generateNumbersList } from "../utils/functions/common.functions";
import LoadingMediaCard from "./LoadingMediaCard";
import { ITvSeriesSlice } from "../redux/slices/tvseries.slice";
import { IMoviesSlice } from "../redux/slices/movies.slice";
import { IMovie } from "../types/movie.types";
import { fetchGenrePaginatedMoviesData } from "../redux/actions/movies.actions";

interface IProps {
    isTvSeries: boolean;
}

const MediaGrid:React.FC<IProps> = ({
    isTvSeries,
}) => {   

    const appDispatch = useAppDispatch();

    ////////////////////////////////////
    // STATE ///////////////////////////
    ////////////////////////////////////

    const mediaState = useSelector((state:RootState) => isTvSeries ? state.tvseries : state.movies);

    const [loadingNextPage, setLoadingNextPage] = useState(false);

    ////////////////////////////////////
    // MEMO ////////////////////////////
    ////////////////////////////////////

    const selectedData = useMemo(() => {
        if(isTvSeries) {
            return mediaState[`${(mediaState as ITvSeriesSlice).selectedTvGenre}TvSeries` as keyof typeof mediaState] as unknown as ITvSeries[];
        } else {
            return mediaState[`${(mediaState as IMoviesSlice).selectedMovieGenre}Movies` as keyof typeof mediaState] as unknown as IMovie[];
        }
    }, [isTvSeries, mediaState]);

    const currentPage = useMemo(() => {

        return selectedData ?  selectedData.length / 20 : 0;

    }, [selectedData]);


    ////////////////////////////////////
    // FUNCTIONS ///////////////////////
    ////////////////////////////////////

    const handleFetchNextPage = useCallback(() => {
        // IF STILL LOADING OR IF INITIAL DATA STILL NOT THERE => RETURN
        if(loadingNextPage || !selectedData) return;

        if(isTvSeries) {
            const selectedGenre = (mediaState as ITvSeriesSlice).tvGenres?.find((genre) => genre.name === (mediaState as ITvSeriesSlice).selectedTvGenre);

            // CALL DISPATCH TO LOAD NEXT PAGE
            appDispatch(fetchGenrePaginatedTvSeriesData({
                page: currentPage + 1,
                genre: selectedGenre!
            }));
        } else {

            const selectedGenre = (mediaState as IMoviesSlice).movieGenres?.find((genre) => genre.name === (mediaState as IMoviesSlice).selectedMovieGenre);

            appDispatch(
                fetchGenrePaginatedMoviesData({
                    page: currentPage + 1,
                    genre: selectedGenre!
                })
            )

        }

        // REMOVE LOADING
        setLoadingNextPage(false);

    }, [loadingNextPage, selectedData, isTvSeries, mediaState, appDispatch, currentPage]);

    const handleScroll = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    
        if (scrolledToBottom) {
            handleFetchNextPage()
        }
      }, [handleFetchNextPage]);

    ////////////////////////////////////
    // USE EFFECT //////////////////////
    ////////////////////////////////////

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    ////////////////////////////////////
    // RENDER //////////////////////////
    ////////////////////////////////////

    return (
        <div className="p-10 pt-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {
                selectedData ? selectedData.map((media) => {
                    return (
                        <MediaItemCard 
                            key={`media-grid-item-${media.id}`}
                            media={media}
                        />
                    )
                })

                :

                generateNumbersList(14).map((number) => {
                    return (
                        <LoadingMediaCard 
                        key={`carousel-grid-item-loading-${number}`}
                        />
                    )
                })
            } 

            {
                generateNumbersList(12).map((number) => {
                    return (
                        <LoadingMediaCard 
                        key={`carousel-grid-item-loading-next-${number}`}
                        />
                    )
                })
            }

        </div>
    )
}

export default MediaGrid