import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { IMAGE_TYPES, TMDB_IMAGE_API_URL } from "../utils/constants";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface IProps {
    title: string;
    mediaList: (IMovie | ITvSeries)[] | null;
}


const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 7,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

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
                responsive={responsive}
                ssr={true} 
                infinite={true}
                autoPlay={false}
                keyBoardControl={false}
                customTransition="all 0.3s linear"
                transitionDuration={1000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item cursor-pointer"
            >
                {
                    mediaList.map((media, index) => {
                        return (
                            <div
                                key={`carousel-item-${index}-${media.id}`}
                                // className="carousel-item transition hover:shadow-xl cursor-pointer active"
                            >
                                <img
                                    src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.medium}/${media.poster_path}`}
                                    className="h-80 w-60 rounded-md"
                                />
                            </div>
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