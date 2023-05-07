import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { IMAGE_TYPES, MEDIA_CARROUSEL_RESPONSIVE, TMDB_IMAGE_API_URL } from "../utils/constants";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MediaItemCard from "./MediaItemCard";

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

    return mediaList ? (
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
                infinite={true}
                autoPlay={false}
                keyBoardControl={false}
                customTransition="all 0.3s linear"
                transitionDuration={1000}
                removeArrowOnDeviceType={["mobile"]}
                itemClass="carousel-item cursor-pointer"
            >
                {
                    mediaList.map((media) => {
                        return (
                            <MediaItemCard 
                                key={`carousel-item-${media.id}`}
                                media={media}
                            />
                        )
                    })
                }
            </Carousel>
    
        </div>

    ) : (
        <h2>Loading</h2>
    )
}

export default MediaCarrousel;