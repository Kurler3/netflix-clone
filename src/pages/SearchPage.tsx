import { useSelector } from "react-redux"
import { getSearchText } from "../redux/selectors/app.selectors"
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

  const navigate = useNavigate();

  ///////////////////////////////
  // SELECTORS //////////////////
  ///////////////////////////////

  const searchText = useSelector(getSearchText);


  console.log(searchText)

  // useEffect(() => {

  //   // IF SEARCH TEXT IS EMPTY => REDIRECT TO HOME PAGE
  //   if(searchText.length === 0) {
  //     navigate('/');
  //   }

  // }, [navigate, searchText.length])

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage