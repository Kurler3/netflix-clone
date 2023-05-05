import { IMovie } from "../types/movie.types";
import { ITvSeries } from "../types/tvseries.types";



interface IProps {
    title: string;
    mediaList: (IMovie | ITvSeries)[] | null;
    mediaType: "tvseries" | "movie";
}

const MediaCarrousel: React.FC<IProps> = ({
    mediaList,
    title,
    mediaType,
}) => {

    return mediaList ? (
        <div>

            <h3>{title}</h3>

            <div className="carousel rounded-box">

                {
                    mediaType === "tvseries" ?
                        (mediaList as ITvSeries[]).map((media, index) => {
                            return (
                                <div
                                    id={`carousel-item-${index}-${media.id}`}
                                    className="carousel-item"
                                >
                                    {media.name}
                                </div>
                            )
                        }) :
                        (mediaList as IMovie[]).map((media, index) => {
                            return (
                                <div
                                    id={`carousel-item-${index}-${media.id}`}
                                    className="carousel-item"
                                >
                                    {media.title}
                                </div>
                            )
                        })
                }
            h</div>
        </div>

    ) : (
        <h2>Loading</h2>
    )
}

export default MediaCarrousel;