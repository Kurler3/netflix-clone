import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvSeriesPage from "./pages/TvSeriesPage";
import MoviesPage from "./pages/MoviesPage";
import Navbar from "./components/Navbar";
import NewAndPopularPage from "./pages/NewAndPopularPage";
import MyListPage from "./pages/MyListPage";
import ByLanguagePage from "./pages/ByLanguagePage";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { fetchTvSeriesData } from "./redux/slices/tvseries.slice";
import Footer from "./components/Footer";

const App = () => {

  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchTvSeriesData());
  }, [appDispatch])

  return (
    <div className="relative">
      {/* NAVBAR */}
      <Navbar />
      {/* ROUTER */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tv-series" element={<TvSeriesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/new-and-popular" element={<NewAndPopularPage />}/>
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/by-language" element={<ByLanguagePage />} />
        </Routes>
      </Router>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}


export default App
