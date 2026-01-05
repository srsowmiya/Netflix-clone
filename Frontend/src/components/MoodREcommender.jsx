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
    setResults(null);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/mood", {
        mood: mood,
      });
      setResults(res.data);
    } catch (err) {
      console.error("Mood API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative px-6 md:px-12 py-12 bg-gradient-to-b from-black/80 to-neutral-900">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        🎭 Mood-Based AI Recommendations
      </h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
        <input
          type="text"
          placeholder="e.g. happy, lonely, stressed, excited…"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="flex-1 bg-neutral-800 text-white placeholder-gray-400 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={submitMood}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition shadow-lg"
        >
          Recommend
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 mt-4 animate-pulse">
          Finding movies that match your mood…
        </p>
      )}

      {/* Results */}
      {results && (
        <div className="mt-10">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            {results.label}
          </h3>

          {results.results.length === 0 ? (
            <p className="text-gray-400">
              No movies found. Try a different mood ✨
            </p>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {results.results.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[180px] cursor-pointer group"
                  onClick={() => navigate(`/player/${movie.id}`)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-neutral-800">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                      />
                    ) : (
                      <div className="h-[270px] flex items-center justify-center text-gray-400 text-sm">
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
          )}
        </div>
      )}
    </section>
  );
};

export default MoodRecommender;
