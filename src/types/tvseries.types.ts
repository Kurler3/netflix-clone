

export interface ITvSeries {
    id: string;
    name: string;
    background_path: string | null;
    first_air_date: string;
    origin_country: string[];
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
}

export interface ITvSeriesRequestParams {
    api_key: string;
    with_genres: string;
    sort_by: string;
    page?: number;
    language: string;
}

export interface ITvSeriesSearchRequestParams {
    api_key: string;
    query: string;
    page?: number;
}