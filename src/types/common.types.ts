
export interface IGenre {
    id: string;
    name: string;
}

export interface IGenreRequestParams {
    api_key: string;
    with_genres: string;
    sort_by: string;
    page?: number;
    language: string;
}