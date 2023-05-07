
export const TMDB_API_URL = 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_API_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_TYPES = {
    original: "original",
    medium: "w500"
}

export const TMDB_API_KEY = import.meta.env.VITE_APP_TMDB_KEY;

export const TV_SERIES_CARROUSEL_CATEGORIES = [
    {
        title: "Popular Tv Series",
        value: "popular",
    },
    {
        title: "Comedy Tv Series",
        value: "comedy"
    }
]


export const TV_SERIES_ALL_CATEGORIES = [
    {
        label: "Comedy",
        value: "comedy"
    },
    {
        label: "Action & Adventure",
        value: "action & adventure"
    },
    {
        label: "Animation",
        value: "animation"
    },
    {
        label: "Crime",
        value: "crime"
    },
    {
        label: "Documentary",
        value: "documentary"
    },
    {
        label: "Drama",
        value: "drama"
    },
    {
        label: "Sci-Fi & Fantasy",
        value: "sci-fi & fantasy"
    }
]
