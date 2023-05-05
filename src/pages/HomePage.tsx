
import {
  useSelector
} from "react-redux"
import { getComedyTvSeries, getPopularTvSeries, getTvSeriesState } from "../redux/selectors/tvseries.selectors";
import { TV_SERIES_CARROUSEL_CATEGORIES } from "../utils/constants";
import MediaCarrousel from "../components/MediaCarrousel";

const HomePage = () => {

  //////////////////////////////
  // SELECTORS /////////////////
  //////////////////////////////

  const tvSeriesState = useSelector(getTvSeriesState)
  
  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  return (
    <>

      {/* BIG BANNER */}


      {/* MAPPING TV CARROUSELS */}
      {
        TV_SERIES_CARROUSEL_CATEGORIES.map((carrouselCategory,index) => {

          return (
            <MediaCarrousel 
              key={`tv-series-carrousel-big-${index}-${carrouselCategory.value}`}
              mediaList={tvSeriesState[`${carrouselCategory.value}TvSeries` as keyof typeof tvSeriesState]}
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