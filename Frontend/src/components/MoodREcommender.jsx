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
      const res = await axios.post("http://127.0.0.1:8000/ai/mood", {
        mood: mood,
      });

      setResults(res.data);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="text-white">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="How are you feeling today?"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="px-4 py-2 w-80 rounded text-black"
        />

        <button
          onClick={submitMood}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Recommend
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {results && (
        <>
          <h3 className="text-xl font-semibold mb-4">
            {results.label}
          </h3>

          <div className="flex gap-4 flex-wrap">
            {results.results.map((movie) => (
              <div
                key={movie.id}
                className="w-40 cursor-pointer"
                onClick={() => navigate(`/player/${movie.id}`)}
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg hover:scale-105 transition"
                  />
                )}
                <p className="mt-2 text-sm">{movie.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoodRecommender;
