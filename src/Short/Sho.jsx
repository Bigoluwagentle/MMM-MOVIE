import React, { useEffect, useState } from "react";
import "./Sho.css";
import NavBar from "../Aside/NavBar";
import { data, Link } from "react-router-dom";
const API_KEY = "082d7edebad5889af817afdc3faceee4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

function Sho() {
  const userName = sessionStorage.getItem("username");
  const [popular, setPopular] = useState([]);
  const [query, setQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState(null);
  useEffect(() => {
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  }, []);
  const fetchMovies = async (url) => {
    try {
    const response = await fetch(url);
    const data = await response.json();
    function checkpopularity() {
        const check = data.results;
        const filtered = check.filter((che) => che.popularity >= 300);
        setPopular(filtered);
    }
    checkpopularity()
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

  const getTrailer = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    console.log(movieId);
    console.log("Trailer API Response:", data.results);

    // Find a video from YouTube that is a trailer or teaser
    const trailer = data.results.find(
      (video) =>
        video.site === "YouTube" &&
        ["Trailer", "Teaser", "Clip"].includes(video.type)
    );

    if (trailer) {
      return `https://www.youtube.com/embed/${trailer.key}`;
    }

    return null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};


  const showTrailer = async (movieId) => {
    const url = await getTrailer(movieId);
    if (url) {
      setTrailerUrl(url);
    } else {
      alert("Trailer not available.");
    }
  };

  const closeModal = () => {
    setTrailerUrl(null);
  };

  return (
    <div>
      <div id="all-movie-container">
        <NavBar/>
        <div className="all-movie-container">
          <header>
          <h1>🎬 MMMS MOVIE</h1>
          <form onSubmit={handleSubmit} id="search-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              id="search-input"
            />
            <button type="submit" style={{background: "none"}}><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
          <nav className="hov">
            <h2 style={{cursor: "pointer"}}>Hi, <span style={{color: "green"}}>{userName}</span></h2>
            <aside style={{background: "white", color: "#134544", width: "150px",padding: "10px", minHeight: "50px", display: "block", position: "absolute"}}>
              <h4 style={{color: "red", cursor: "pointer"}} onClick={() => {
              let confirmed = window.confirm("Do you really want to Logout?");
              if (confirmed) {
                document.querySelector("#login").click();
              }
              }}>Logout</h4>
              <Link to="/login" id="login"></Link>
              </aside>
            </nav>
            
          </header>

          <main id="movie-container">
            {popular.length === 0 ? (
                <p>No results found.</p>
                ) : (
                popular.map((movie) => (
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
                        <button className="trailer-btn" onClick={() => showTrailer(movie.id)}>
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
            <iframe
                id="trailer-frame"
                src={trailerUrl}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title="Movie Trailer"
            ></iframe>
            </div>
        </div>
        )}
        </div>
        
      </div>
      

    </div>
  );
}

export default Sho;