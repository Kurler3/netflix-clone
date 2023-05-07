import React from 'react'
import { ITvSeries } from '../types/tvseries.types'
import { IMovie } from '../types/movie.types'
import { IMAGE_TYPES, TMDB_IMAGE_API_URL } from '../utils/constants';

interface IProps {
    media: ITvSeries | IMovie;
}

const MediaItemCard: React.FC<IProps> = ({
    media
}) => {
    return (
        <div
            className="cursor-pointer"
        >
            <img
                src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.medium}/${media.poster_path}`}
                className="h-80 w-60 rounded-md"
            />
        </div>
    )
}

export default MediaItemCard