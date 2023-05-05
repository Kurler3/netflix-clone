import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";
import { IMAGE_TYPES, TMDB_IMAGE_API_URL } from "../utils/constants";



interface IProps {
    title: string;
    mediaList: (IMovie | ITvSeries)[] | null;
}

const MediaCarrousel: React.FC<IProps> = ({
    mediaList,
    title,
}) => {

    return mediaList ? (
        <div className="p-4">

            <div className="text-xl font-bold text-secondary mb-3">
                {title}
            </div>

            <div className="carousel rounded-box gap-4">
                {
                    mediaList.map((media, index) => {
                        return (
                            <div
                                key={`carousel-item-${index}-${media.id}`}
                                className="carousel-item flex-col hover:scale-[1.1] transition cursor-pointer"
                            >
                                <img
                                    src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.medium}/${media.poster_path}`}
                                    className="h-80 w-60 rounded-md"
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>

    ) : (
        <h2>Loading</h2>
    )
}

export default MediaCarrousel;