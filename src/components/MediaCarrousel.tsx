import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { MEDIA_CARROUSEL_RESPONSIVE } from "../utils/constants";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MediaItemCard from "./MediaItemCard";
import { generateNumbersList } from "../utils/functions/common.functions";
import LoadingMediaCard from "./LoadingMediaCard";

interface IProps {
    title: string;
    mediaList: (IMovie | ITvSeries)[] | null;
}


const MediaCarrousel: React.FC<IProps> = ({
    mediaList,
    title,
}) => {


    ///////////////////////////////////
    // RENDER /////////////////////////
    ///////////////////////////////////

    return (
        <div className="p-4">
            <div className="text-xl font-bold text-secondary mb-3">
                {title}
            </div>


            <Carousel
                swipeable={true}
                draggable={false}
                showDots={false}
                responsive={MEDIA_CARROUSEL_RESPONSIVE}
                ssr={true}
                infinite={false}
                arrows={false}
                autoPlay={false}
                keyBoardControl={false}
                customTransition="all 0.3s linear"
                transitionDuration={1000}
                removeArrowOnDeviceType={["mobile"]}
                itemClass={`carousel-item ${mediaList ? "cursor-pointer" : ""}`}
            >
                {
                    mediaList ?
                        mediaList.map((media) => {
                            return (
                                <MediaItemCard
                                    key={`carousel-item-${media.id}`}
                                    media={media}
                                />
                            )
                        }) :
                        generateNumbersList(7).map((number) => {
                            return (
                                <LoadingMediaCard 
                                key={`carousel-item-loading-${number}-${title}`}
                                />
                            )
                        })
                }
            </Carousel>


        </div>
    )
}

export default MediaCarrousel;