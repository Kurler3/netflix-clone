import { Dispatch } from "redux";
import { IGenre } from "../../types/common.types";
import { IMovie } from "../../types/movie.types";
import _ from "lodash";
import { MOVIES_CARROUSEL_CATEGORIES } from "../constants";
import { fetchGenresMoviesData } from "../../redux/actions/movies.actions";


interface IPropsFetchCarrouselMovieData {
    movieGenres: IGenre[] | null;
    comedyMovies: IMovie[] | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appDispatch: Dispatch<any>;
}

export const fetchCarrouselMovieData = ({
    movieGenres,
    comedyMovies,
    appDispatch,
}: IPropsFetchCarrouselMovieData) => {

    if(
        movieGenres && movieGenres.length > 0 &&
        comedyMovies === null
    ) {

        const missingCategories = _.cloneDeep(MOVIES_CARROUSEL_CATEGORIES)

        missingCategories.shift();

        const missingGenres = movieGenres.filter((genre) => {
            return missingCategories.find((category) => category.value === genre.name.toLowerCase());
        });

        if(missingGenres.length > 0) {
            appDispatch(fetchGenresMoviesData(missingGenres));
        }

    }

}

