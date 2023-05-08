
export interface IMovie {
    id: string;
    title: string;
    background_drop: string | null;
    adult: boolean;
    genres: {id: string; name: string;}[];
    homepage: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    video: boolean;
    vote_average: number;
}
