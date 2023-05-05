
import React from 'react'
import { IMAGE_TYPES, TMDB_IMAGE_API_URL } from '../utils/constants'
import { IMovie } from '../types/movie.types'
import { ITvSeries } from '../types/tvseries.types'

interface IProps {
    media: IMovie | ITvSeries;
}

const BigBannerMedia:React.FC<IProps> = ({
    media,
}) => {
  return (
    <div className="min-w-full h-[700px]">
            <div className="relative w-full h-full">
              {/* POSTER */}
              <img 
                src={`${TMDB_IMAGE_API_URL}/${IMAGE_TYPES.original}/${media.poster_path}`}
                className="object-cover h-[800px] w-full object-left-top mask1"
              />
              {/* TEXT */}
              <div className="absolute flex flex-col justify-start items-start top-[30%] left-0 px-10"> 
                  {/* NAME */}
                  <h1 className="text-8xl">
                    {'title' in media ? media.title : media.name}
                  </h1>
                  {/* OVERVIEW */}
                  <p className="max-w-[500px] mt-5">
                    {media.overview}
                  </p>
              </div>
            </div>  
          </div>
  )
}

export default BigBannerMedia