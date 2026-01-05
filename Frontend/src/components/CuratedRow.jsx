import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CuratedRow = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

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
        {movies?.map((movie) => (
          <Link
            key={movie.videoId}
            to={`/player/${movie.videoId}`}
            className="min-w-[240px] group"
          >
            <img
              src={`https://img.youtube.com/vi/${movie.videoId}/hqdefault.jpg`}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/card3.jpg"; // MUST be in /public
              }}
              className="h-36 w-full rounded-md object-cover
                         transition-transform duration-300
                         group-hover:scale-105"
            />
            <p className="text-sm text-gray-200 mt-2 truncate">
              {movie.title}
            </p>
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
