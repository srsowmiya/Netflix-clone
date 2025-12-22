import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoodRecommender = () => {
  const [mood, setMood] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitMood = async () => {
    if (!mood.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/mood", { mood });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <section className="px-6 md:px-12 py-10 bg-neutral-900/60 backdrop-blur-md">
      
      {/* Section title */}
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        What are you in the mood for?
      </h2>

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl">
        <input
          type="text"
          placeholder="e.g. happy, lonely, stressed, excited…"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="flex-1 bg-neutral-800 text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={submitMood}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition"
        >
          Recommend
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-sm">
          Curating movies for your mood…
        </p>
      )}

      {/* Results */}
      {results && (
        <>
          <h3 className="text-lg text-white mb-3 mt-6">
            {results.label}
          </h3>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {results.results.map((movie) => (
              <div
                key={movie.id}
                className="min-w-[180px] cursor-pointer group"
                onClick={() => navigate(`/player/${movie.id}`)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg transform group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="h-[270px] bg-neutral-700 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-200 truncate">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MoodRecommender;
