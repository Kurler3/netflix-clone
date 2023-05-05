import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { IMAGE_TYPES, TMDB_IMAGE_API_URL } from "../utils/constants";
import {
    useState,
    useEffect
} from "react";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from "react-icons/ai"

interface IProps {
    title: string;
    mediaList: (IMovie | ITvSeries)[] | null;
}


// TODO use react-multi-carousel

const MediaCarrousel: React.FC<IProps> = ({
    mediaList,
    title,
}) => {

    ///////////////////////////////////
    // STATE //////////////////////////
    ///////////////////////////////////

    const [currentIndex, setCurrentIndex] = useState(0);


    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    };

    const handleNextClick = () => {
        if (mediaList) {
            setCurrentIndex((prevIndex) =>
                prevIndex < mediaList.length - 1 ? prevIndex + 1 : mediaList.length - 1
            );
        }
    };


    ///////////////////////////////////
    // RENDER /////////////////////////
    ///////////////////////////////////

    return mediaList ? (
        <div className="p-4">

            <div className="text-xl font-bold text-secondary mb-3">
                {title}
            </div>

            <div className="carousel rounded-box gap-4 relative">

                {
                    currentIndex > 0 && (
                        <AiOutlineArrowLeft
                            className="absolute bg-neutral rounded-md opacity-0 hover:opacity-[0.9] left-5 top-[100px] text-[80px] hover:cursor-pointer hover:text-white transition hover:scale-[1.2]"
                            onClick={handlePrevClick}
                        />
                    )
                }


                {
                    mediaList.map((media, index) => {
                        return (
                            <div
                                key={`carousel-item-${index}-${media.id}`}
                                className="carousel-item transition hover:shadow-xl cursor-pointer active"
                            >
                                <img
                                    src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.medium}/${media.poster_path}`}
                                    className="h-80 w-60 rounded-md"
                                />
                            </div>
                        )
                    })
                }

                <AiOutlineArrowRight
                    className="absolute bg-neutral rounded-md opacity-0 hover:opacity-[0.9] right-5 top-[100px] text-[80px] hover:cursor-pointer hover:text-white transition hover:scale-[1.2]"
                    onClick={handleNextClick}
                />
                
            </div>
        </div>

    ) : (
        <h2>Loading</h2>
    )
}

export default MediaCarrousel;