import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CuratedRow = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="section-title bg-transparent relative mb-6">
      {/* Section title */}
      <h1 className="text-xl font-semibold text-white mb-2">
        {title}
      </h1>

      <div className="relative">
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
          className="flex gap-3 p-4 overflow-x-auto scrollbar-hide w-full scroll-smooth"
        >
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                to={`/player/${movie.videoId}`}
                key={movie.id}
                className="flex-shrink-0 w-60 group relative"
              >
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="rounded-md shadow-md transition-transform 
                             duration-300 ease-in-out 
                             group-hover:scale-105 group-hover:shadow-xl 
                             object-cover h-32 w-full"
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No movies found.</p>
          )}
        </div>

        {/* Right Arrow */}
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

export default CuratedRow;
