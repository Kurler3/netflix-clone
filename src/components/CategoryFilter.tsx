import { useSelector } from "react-redux"
import { MOVIES_ALL_CATEGORIES, TV_SERIES_ALL_CATEGORIES } from "../utils/constants"
import { RootState } from "../redux/store";

interface IProps {
    handleSelectGenre: (selectedGenre: string) => void;
    handleRemoveSelectedGenre:() => void;
    isTvSeries: boolean;
}

const CategoryFilter:React.FC<IProps> = ({
    handleSelectGenre,
    handleRemoveSelectedGenre,
    isTvSeries,
}) => {

    //////////////////////////////////////////
    // STATE /////////////////////////////////
    //////////////////////////////////////////

    const selectedGenre = useSelector((state:RootState) => {
        if(isTvSeries) return state.tvseries.selectedTvGenre;
        else return state.movies.selectedMovieGenre;
    })

    //////////////////////////////////////////
    // RENDER ////////////////////////////////
    //////////////////////////////////////////


    return (
        <div className='absolute top-20 left-20 dropdown dropdown-hover z-30'>
            <label tabIndex={0} className={`btn m-1 ${selectedGenre ? "btn-error" : "btn-neutral"}`}>Categories</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">

                {
                    (isTvSeries ? TV_SERIES_ALL_CATEGORIES : MOVIES_ALL_CATEGORIES).map((category) => {
                        return (
                            <li
                                key={`category_select_${category.value}`}
                                onClick={() => handleSelectGenre(category.value)}
                                className={`
                                    ${selectedGenre && selectedGenre === category.value ? "bordered" : ""}
                                `}

                            >
                                <a>
                                    {category.label}
                                </a>
                            </li>
                        )
                    })
                }

                {/* REMOVE SELECTED */}
                {
                    selectedGenre && (
                        <li
                            key="category_select_remove_selected"
                            onClick={handleRemoveSelectedGenre}
                            className="btn-outline btn-error"
                        >
                            <a>Remove Selected</a>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default CategoryFilter