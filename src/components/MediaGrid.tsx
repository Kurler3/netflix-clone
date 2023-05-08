import { useSelector } from "react-redux"
import { getTvSeriesState } from "../redux/selectors/tvseries.selectors"
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITvSeries } from "../types/tvseries.types";
import MediaItemCard from "./MediaItemCard";
import { useAppDispatch } from '../redux/store';
import { fetchGenrePaginatedTvSeriesData } from "../redux/actions/tvseries.actions";
import { generateNumbersList } from "../utils/functions/common.functions";
import LoadingMediaCard from "./LoadingMediaCard";


const MediaGrid = () => {   

    const appDispatch = useAppDispatch();

    ////////////////////////////////////
    // STATE ///////////////////////////
    ////////////////////////////////////

    const tvSeriesState = useSelector(getTvSeriesState);

    const [loadingNextPage, setLoadingNextPage] = useState(false);

    ////////////////////////////////////
    // MEMO ////////////////////////////
    ////////////////////////////////////

    const selectedTvSeriesData = useMemo(() => {
        return tvSeriesState[`${tvSeriesState.selectedTvGenre}TvSeries` as keyof typeof tvSeriesState] as unknown as ITvSeries[];
    }, [tvSeriesState]);

    const currentPage = useMemo(() => {

        return selectedTvSeriesData ?  selectedTvSeriesData.length / 20 : 0;

    }, [selectedTvSeriesData]);


    ////////////////////////////////////
    // FUNCTIONS ///////////////////////
    ////////////////////////////////////

    const handleFetchNextPage = useCallback(() => {
        // IF STILL LOADING OR IF INITIAL DATA STILL NOT THERE => RETURN
        if(loadingNextPage || !selectedTvSeriesData) return;

        const selectedGenre = tvSeriesState.tvGenres?.find((genre) => genre.name === tvSeriesState.selectedTvGenre);

        // CALL DISPATCH TO LOAD NEXT PAGE
        appDispatch(fetchGenrePaginatedTvSeriesData({
            page: currentPage + 1,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            genre: selectedGenre!
        }))

        // REMOVE LOADING
        setLoadingNextPage(false);

    }, [appDispatch, currentPage, loadingNextPage, selectedTvSeriesData, tvSeriesState.selectedTvGenre, tvSeriesState.tvGenres]);

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
                selectedTvSeriesData ? selectedTvSeriesData.map((tvSeries) => {
                    return (
                        <MediaItemCard 
                            key={`media-grid-item-${tvSeries.id}`}
                            media={tvSeries}
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