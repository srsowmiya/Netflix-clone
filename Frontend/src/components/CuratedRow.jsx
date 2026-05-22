import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TMDB_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzFkMTRiOTA4OWIwYzg0NTg1ODY2NjBkNTg2Nzg3NSIsIm5iZiI6MTc1NjM3NzQ5Ni42NzcsInN1YiI6IjY4YjAzMTk4ZjkwMzYwMDZhYmZhOTc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S7Zg89Y5jmogBFOxfwzt61vpNwvYbC0qONUWRdiISho";

// Shared cache across all CuratedRow instances
const posterCache = {};

async function fetchTMDBPoster(title) {
  if (posterCache[title] !== undefined) return posterCache[title];

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
      const imgPath = movie.backdrop_path || movie.poster_path;
      if (imgPath) {
        const url = `https://image.tmdb.org/t/p/w500${imgPath}`;
        posterCache[title] = url;
        return url;
      }
    }
  } catch (err) {
    console.error("TMDB search error:", title, err);
  }

  posterCache[title] = null;
  return null;
}

const CuratedRow = ({ title, movies = [] }) => {
  const scrollRef = useRef(null);
  const [posters, setPosters] = useState({});

  const validMovies = movies.filter(
    (movie) => movie?.videoId && typeof movie.videoId === "string"
  );

  // Fetch TMDB posters for all movies in this row
  useEffect(() => {
    if (validMovies.length === 0) return;

    let cancelled = false;

    const fetchAll = async () => {
      const results = {};
      await Promise.all(
        validMovies.map(async (movie) => {
          if (movie.title) {
            const url = await fetchTMDBPoster(movie.title);
            if (url) results[movie.videoId] = url;
          }
        })
      );
      if (!cancelled) {
        setPosters((prev) => ({ ...prev, ...results }));
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, [title]);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  if (validMovies.length === 0) return null;

  return (
    <section className="mb-8 relative">
      <h2 className="text-xl font-semibold text-white mb-3 px-4">
        {title}
      </h2>

      {/* Left Arrow */}
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 
                   text-white text-3xl cursor-pointer z-10 hidden md:block"
      />

      {/* Movie Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {validMovies.map((movie) => (
          <Link
            key={movie.videoId}
            to={`/player/${movie.videoId}`}
            className="min-w-[240px] group"
          >
            <img
              src={
                posters[movie.videoId] ||
                `https://img.youtube.com/vi/${movie.videoId}/hqdefault.jpg`
              }
              alt={movie.title || "Video"}
              loading="lazy"
              onLoad={(e) => {
                // Detect YouTube placeholder (3 dots image)
                if (
                  e.target.naturalWidth === 120 &&
                  e.target.naturalHeight === 90
                ) {
                  e.target.style.opacity = "0.3";
                }
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.opacity = "0.3";
              }}
              className="h-36 w-full rounded-md object-cover
                         transition-transform duration-300
                         group-hover:scale-105 bg-gray-800"
            />
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 
                   text-white text-3xl cursor-pointer z-10 hidden md:block"
      />
    </section>
  );
};

export default CuratedRow;
