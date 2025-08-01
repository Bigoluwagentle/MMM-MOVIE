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
      <section id="LandingHeader">
        <header>
          <h1 title="Money Must be Made">🎬 MMM MOVIE</h1>
          <a href="#movie-container">Movies</a>
          <form onSubmit={handleSubmit} id="search-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              id="search-input"
            />
            <i class="fa-solid fa-magnifying-glass" style={{paddingRight: "10px", cursor: "pointer"}}></i>
          </form>
          <nav>
              <button onClick={() => {
                document.querySelector("#login").click();
              }}><i class="fa-solid fa-right-to-bracket"></i> Get Started</button>
              <Link to="/login" id="login"></Link>
          </nav>
        </header>
        <nav>
          <h1>Watch the Best Movie Here!</h1>
          <p>Thousands of movie in one place. Unlimited entertainment</p>
        </nav>
        <aside>
          <button><i class="fa-solid fa-film"></i> Watch Anywhere</button>
          <button><i class="fa-solid fa-ban"></i> No Ads</button>
          <button> <i class="fa-solid fa-film"></i> Watch Trailer</button>
        </aside>
      </section>
      

      <main id="movie-container">
        <div className="movie-card" id="free">
          <h4>Free</h4>
          <h3>Free</h3>
          <li>Limited access to movie</li>
          <li>Watch on any device</li>
          <button>Get Started</button>
        </div>
        <div className="movie-card" id="free">
          <h4>Premius</h4>
          <h3>12.98/month</h3>
          <li>Unlimited access to movie</li>
          <li>Download to any device</li>
          <button>Get Started</button>
        </div>
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
                <div className="movie-title" style={{color: "white"}}>{movie.title}</div>
                <button
                  className="trailer-btn"
                  onClick={() => showTrailer(movie.id)}
                >
                  🎬 Watch Trailer
                </button>
              </div>
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
