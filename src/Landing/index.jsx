import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
const API_KEY = "082d7edebad5889af817afdc3faceee4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Landing() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }, []);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
    }
  };

  const showTrailer = async () => {
    document.getElementById("logine").click();
  };

  const closeModal = () => {
    setTrailerUrl(null);
  };

  return (
    <div>
      <Link to="/login" id="logine"></Link>
      <header>
        <h1 title="Money Must be Made">🎬 MMM MOVIE</h1>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            id="search-input"
          />
          <button type="submit"><i class="fa-regular fa-magnifying-glass"></i> Search</button>
        </form>
        <nav>
            <button onClick={() => {
              document.querySelector("#login").click();
            }}><i class="fa-solid fa-right-to-bracket"></i> Login</button>
            <Link to="/login" id="login"></Link>
        </nav>
      </header>

      <main id="movie-container">
        {movies.length === 0 ? (
          <p>No results found.</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? IMG_URL + movie.poster_path
                    : "https://via.placeholder.com/500x750"
                }
                alt={movie.title}
              />
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-overview">
                  {movie.overview || "No description available."}
                </div>
                <button
                  className="trailer-btn"
                  onClick={() => showTrailer(movie.id)}
                >
                  🎬 Watch Trailer
                </button>
              </div>
             <marquee>You are Welcome to Money Must be Made Movie (MMM Movie)</marquee>
            </div>
          ))
        )}
      </main>

      {trailerUrl && (
    <div id="trailer-modal" className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span id="close-modal" onClick={closeModal}>&times;</span>
        <iframe></iframe>
        </div>
    </div>
    )}

    </div>
  );
}

export default Landing;
