import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const TitleCard = (props) => {
  const scrollRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzFkMTRiOTA4OWIwYzg0NTg1ODY2NjBkNTg2Nzg3NSIsIm5iZiI6MTc1NjM3NzQ5Ni42NzcsInN1YiI6IjY4YjAzMTk4ZjkwMzYwMDZhYmZhOTc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S7Zg89Y5jmogBFOxfwzt61vpNwvYbC0qONUWRdiISho",
    },
  };

  useEffect(() => {
    if (!props.url) return;

    setLoading(true);
    fetch(props.url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // 👀 Debug response

        if (Array.isArray(data.results)) {
          setMovies(data.results);
        } else if (data && data.id) {
          setMovies([data]);
        } else {
          setMovies([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [props.url]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="section-title bg-transparent relative">
      <h1 className="text-xl font-semibold text-white mb-2">{props.name}</h1>
      <div className="relative">
        {/* Left Scroll Button */}
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 
                     text-white text-3xl cursor-pointer z-10 hidden md:block"
        />

        {/* Movie Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 p-4 overflow-x-auto scrollbar-hide w-full scroll-smooth"
        >
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-60 group relative">
                {/* Image */}
                <img
                  src={
                    movie.backdrop_path || movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${
                          movie.backdrop_path || movie.poster_path
                        }`
                      : "https://via.placeholder.com/500x281?text=No+Image"
                  }
                  alt={movie.title || movie.name}
                  className="rounded-md shadow-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl object-cover h-32 w-full"
                />

              
              </div>
            ))
          ) : (
            <p className="text-gray-400">No movies found.</p>
          )}
        </div>

        {/* Right Scroll Button */}
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     text-white text-3xl cursor-pointer z-10 hidden md:block"
        />
      </div>
    </div>
  );
};

export default TitleCard;
