import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TvSeriesPage from "./pages/TvSeriesPage";
import MoviesPage from "./pages/MoviesPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>

      <Navbar />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tvseries" element={<TvSeriesPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </Router>

    </>
  )
}


export default App
