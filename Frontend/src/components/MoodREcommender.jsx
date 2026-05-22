import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const TMDB_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzFkMTRiOTA4OWIwYzg0NTg1ODY2NjBkNTg2Nzg3NSIsIm5iZiI6MTc1NjM3NzQ5Ni42NzcsInN1YiI6IjY4YjAzMTk4ZjkwMzYwMDZhYmZhOTc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S7Zg89Y5jmogBFOxfwzt61vpNwvYbC0qONUWRdiISho";

const BACKEND_URL = "http://127.0.0.1:8000";

// Mood emoji mapping
const moodEmojis = {
  happy: "😊", sad: "😢", excited: "🔥", relaxed: "😌",
  romantic: "❤️", scared: "😱", nostalgic: "🥹", adventurous: "🧭",
  funny: "😂", inspiring: "✨", angry: "😤", bored: "😴",
};

const quickMoods = [
  "happy", "sad", "excited", "relaxed", "romantic",
  "scared", "nostalgic", "adventurous", "funny", "inspiring",
];

// Search TMDB for a movie title → get poster + video info
async function searchTMDB(title) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_TOKEN,
        },
      }
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      return {
        id: movie.id,
        title: movie.title || title,
        poster: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        overview: movie.overview,
        rating: movie.vote_average,
      };
    }
  } catch (err) {
    console.error("TMDB search error:", title, err);
  }
  return { id: null, title, poster: null, overview: "", rating: 0 };
}

// Fetch YouTube trailer for a TMDB movie ID
async function fetchTrailer(tmdbId) {
  if (!tmdbId) return null;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_TOKEN,
        },
      }
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      // Prefer official trailers
      const trailer =
        data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        ) || data.results.find((v) => v.site === "YouTube");
      return trailer ? trailer.key : null;
    }
  } catch (err) {
    console.error("Trailer fetch error:", tmdbId, err);
  }
  return null;
}

const MoodRecommender = () => {
  const [mood, setMood] = useState("");
  const [activeMood, setActiveMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const submitMood = async (inputMood) => {
    const moodText = (inputMood || mood).trim();
    if (!moodText) return;

    setLoading(true);
    setError(null);
    setMovies([]);
    setActiveMood(moodText.toLowerCase());

    try {
      // Step 1: Call backend → OpenAI LLM
      const backendRes = await fetch(`${BACKEND_URL}/ai/mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: moodText }),
      });

      if (!backendRes.ok) {
        const errData = await backendRes.json().catch(() => ({}));
        throw new Error(errData.detail || `Backend error: ${backendRes.status}`);
      }

      const data = await backendRes.json();
      const movieTitles = data.recommendations || [];

      if (movieTitles.length === 0) {
        setError("The AI couldn't think of any movies. Try a different mood!");
        setLoading(false);
        return;
      }

      // Step 2: Search TMDB for each movie → get poster images
      const tmdbResults = await Promise.all(
        movieTitles.map((title) => searchTMDB(title))
      );

      // Step 3: Fetch YouTube trailers for each movie
      const enrichedMovies = await Promise.all(
        tmdbResults.map(async (movie) => {
          const videoId = await fetchTrailer(movie.id);
          return { ...movie, videoId };
        })
      );

      setMovies(enrichedMovies);
    } catch (err) {
      console.error("Mood recommendation error:", err);
      setError(
        err.message.includes("Failed to fetch")
          ? "Backend is not running. Start it with: uvicorn main:app --reload"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePillClick = (moodKey) => {
    setMood(moodKey);
    submitMood(moodKey);
  };

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <section className="mood-recommender">
      {/* Mood Input */}
      <div className="mood-input-row">
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitMood()}
          placeholder="Type your mood... happy, sad, excited, romantic..."
          className="mood-input"
          disabled={loading}
        />
        <button
          onClick={() => submitMood()}
          disabled={loading}
          className="mood-btn"
        >
          {loading ? "🤔 Thinking..." : "🎬 Recommend"}
        </button>
      </div>

      {/* Quick Mood Pill Buttons */}
      <div className="mood-pills">
        {quickMoods.map((m) => (
          <button
            key={m}
            onClick={() => handlePillClick(m)}
            disabled={loading}
            className={`mood-pill ${activeMood === m ? "mood-pill-active" : ""}`}
          >
            {moodEmojis[m] || "🎭"} {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mood-loading">
          <div className="mood-loading-spinner" />
          <p className="mood-loading-text">
            AI is picking the perfect movies for your mood...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="mood-error">⚠️ {error}</p>
      )}

      {/* Recommended Movies Row */}
      {!loading && movies.length > 0 && (
        <div className="mood-results">
          <h3 className="mood-results-title">
            {moodEmojis[activeMood] || "🎬"} AI picks for{" "}
            <span className="mood-highlight">{activeMood}</span>
          </h3>

          <div className="mood-row-wrapper">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => scroll("left")}
              className="mood-scroll-btn mood-scroll-left"
            />

            <div ref={scrollRef} className="mood-movie-row">
              {movies.map((movie, idx) => {
                const linkTo = movie.videoId
                  ? `/player/${movie.videoId}`
                  : "#";

                return (
                  <Link
                    key={movie.id || idx}
                    to={linkTo}
                    className="mood-movie-card"
                  >
                    <div className="mood-movie-img-wrapper">
                      {movie.poster ? (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          loading="lazy"
                          className="mood-movie-img"
                        />
                      ) : (
                        <div className="mood-movie-placeholder" />
                      )}
                      <div className="mood-movie-overlay">
                        {movie.rating > 0 && (
                          <span className="mood-movie-rating">
                            ⭐ {movie.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mood-movie-title">{movie.title}</p>
                  </Link>
                );
              })}
            </div>

            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => scroll("right")}
              className="mood-scroll-btn mood-scroll-right"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MoodRecommender;