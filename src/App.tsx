import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvSeriesPage from "./pages/TvSeriesPage";
import MoviesPage from "./pages/MoviesPage";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import Footer from "./components/Footer";
import { fetchTvSeriesData } from "./redux/actions/tvseries.actions";
import { fetchInitialMovieData } from "./redux/actions/movies.actions";

const App = () => {

  const appDispatch = useAppDispatch();

  useEffect(() => {
    // FETCH INITIAL TV DATA
    appDispatch(fetchTvSeriesData());
    // FETCH INITIAL MOVIE DATA
    appDispatch(fetchInitialMovieData());
  }, [appDispatch])

  return (
    <div className="relative">
      {/* NAVBAR */}
      <Navbar />
      {/* ROUTER */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage isTvSeries={true} />} />
          <Route path="/tv-series" element={<TvSeriesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </Router>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}


export default App
