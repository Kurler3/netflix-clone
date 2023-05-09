import { useSelector } from "react-redux"
import { getSearchText } from "../redux/selectors/app.selectors"
import { useState, useEffect, useCallback } from 'react';
import MediaGrid from "../components/MediaGrid";
import { useNavigate } from 'react-router-dom';
import { getSearchTvSeries } from "../redux/selectors/tvseries.selectors";
import { getSearchMovies } from "../redux/selectors/movies.selectors";
import { useAppDispatch } from "../redux/store";
import { searchTvSeriesByName } from "../redux/actions/tvseries.actions";
import { searchMoviesByTitle } from "../redux/actions/movies.actions";

const SearchPage = () => {

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  ///////////////////////////////
  // STATE //////////////////////
  ///////////////////////////////

  const [selectedOption, setSelectedOption] = useState<string>("tvseries");


  ///////////////////////////////
  // SELECTORS //////////////////
  ///////////////////////////////

  const searchText = useSelector(getSearchText);
  const searchTvSeries = useSelector(getSearchTvSeries);
  const searchMovies = useSelector(getSearchMovies);

  ///////////////////////////////
  // FUNCTIONS //////////////////
  ///////////////////////////////

  const handleSelectOption = useCallback((newOption: string) => {
    if (newOption !== selectedOption) {
      setSelectedOption(newOption);

      if (newOption === "tvseries" && !searchTvSeries) {

        appDispatch(
          searchTvSeriesByName({
            name: searchText,
            page: 1,
          })
        );

      } else if (newOption === "movies" && !searchMovies) {

        appDispatch(
          searchMoviesByTitle({
            title: searchText,
            page: 1,
          })
        )

      }
    }
  }
    , [appDispatch, searchMovies, searchText, searchTvSeries, selectedOption]);

  ///////////////////////////////
  // USE EFFECT /////////////////
  ///////////////////////////////

  useEffect(() => {
    // IF SEARCH TEXT IS EMPTY => REDIRECT TO HOME PAGE
    if (searchText.length === 0) {
      navigate('/');
    }
  }, [navigate, searchText.length])

  ///////////////////////////////
  // RENDER /////////////////////
  ///////////////////////////////

  return (
    <div className="pt-20">

      {/* TV AND MOVIES BUTTONS CONTAINER */}
      <div className="w-full flex items-center justify-center p-3 gap-4">
        {/* TV BUTTON  */}
        <button className={`btn ${selectedOption === "tvseries" ? "border-primary border-2" : ""}`} onClick={() => handleSelectOption('tvseries')}>TV Series</button>
        {/* MOVIES BUTTON */}
        <button className={`btn ${selectedOption === "movies" ? "border-primary border-2" : ""}`} onClick={() => handleSelectOption('movies')}>Movies</button>
      </div>

      {/* MEDIA GRID */}
      <MediaGrid
        isTvSeries={selectedOption === "tvseries"}
        searchText={searchText}
      />

    </div>
  )
}

export default SearchPage