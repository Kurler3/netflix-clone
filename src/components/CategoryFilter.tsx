import { useSelector } from "react-redux"
import { TV_SERIES_ALL_CATEGORIES } from "../utils/constants"
import { getSelectedTvSeriesGenre } from "../redux/selectors/tvseries.selectors"

interface IProps {
    handleSelectTvGenre: (selectedGenre: string) => void;
    handleRemoveSelectedTvGenre:() => void
}

const CategoryFilter:React.FC<IProps> = ({
    handleSelectTvGenre,
    handleRemoveSelectedTvGenre
}) => {

    //////////////////////////////////////////
    // STATE /////////////////////////////////
    //////////////////////////////////////////

    const selectedTvGenre = useSelector(getSelectedTvSeriesGenre);  

    //////////////////////////////////////////
    // RENDER ////////////////////////////////
    //////////////////////////////////////////


    return (
        <div className='absolute top-20 left-20 dropdown dropdown-hover z-30'>
            <label tabIndex={0} className={`btn m-1 ${selectedTvGenre ? "btn-error" : "btn-neutral"}`}>Categories</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">

                {
                    TV_SERIES_ALL_CATEGORIES.map((tvCategory) => {
                        return (
                            <li
                                key={`tv_category_select_${tvCategory.value}`}
                                onClick={() => handleSelectTvGenre(tvCategory.value)}
                                className={`
                                    ${selectedTvGenre && selectedTvGenre === tvCategory.value ? "bordered" : ""}
                                `}

                            >
                                <a>
                                    {tvCategory.label}
                                </a>
                            </li>
                        )
                    })
                }

                {/* REMOVE SELECTED */}
                {
                    selectedTvGenre && (
                        <li
                            key="tv_category_select_remove_selected"
                            onClick={handleRemoveSelectedTvGenre}
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