import React, { useState } from "react";
import axios from "axios";

const MoodRecommender = () => {
  const [mood, setMood] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitMood = async () => {
    if (!mood.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/ai/mood", {
        mood: mood,
      });

      setResults(res.data);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>AI Mood-Based Movie Recommendations</h2>

      <input
        type="text"
        placeholder="How are you feeling?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button
        onClick={submitMood}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Recommend
      </button>

      {loading && <p>Loading...</p>}

      {results && (
        <div style={{ marginTop: "20px" }}>
          <h3>{results.label}</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {results.results.map((movie) => (
              <div key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ borderRadius: "8px" }}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodRecommender;
