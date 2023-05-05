

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