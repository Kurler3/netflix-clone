
export const TMDB_API_URL = 'https://api.themoviedb.org/3';

export const TMDB_IMAGE_API_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_TYPES = {
    original: "original",
    medium: "w500"
}

export const TMDB_API_KEY = import.meta.env.TMDB_KEY;

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

export const MOVIES_CARROUSEL_CATEGORIES = [
    {
        title: "Popular Movies",
        value: "popular",
    },
    {
        title: "Comedy Movies",
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
];

export const MOVIES_ALL_CATEGORIES = [
    {
        label: "Comedy",
        value: "comedy"
    },
    {
        label: "Action",
        value: "action"
    },
    {
        label: "Adventure",
        value: "adventure"
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
        value: "documentary",
    },
    {
        label: "Drama",
        value: "drama",
    },
    {
        label: "Horror",
        value: "horror"
    },
    {
        label: "Romance",
        value: "romance"
    }
]


export const MEDIA_CARROUSEL_RESPONSIVE = {
    desktop: {
      breakpoint: { max: 2000, min: 1700 },
      items: 7,
      slidesToSlide: 3
    },
    laptop: {
        breakpoint: { max: 1700, min: 1300 },
      items: 5,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1300, min: 800 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    smallTablet: {
        breakpoint: { max: 800, min: 500 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
}

