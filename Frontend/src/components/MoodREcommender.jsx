import React, { useState } from "react";
import axios from "axios";
import CuratedRow from "./CuratedRow";
// Ensure the path below is correct and curatedMovies.js uses a NAMED export
import { curatedByMood } from "../data/curatedMovies";

const MoodRecommender = () => {
  const [mood, setMood] = useState("");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitMood = async () => {
    if (!mood.trim()) return;

    setLoading(true);
    setCategory(null);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ai/mood", {
        mood: mood.toLowerCase(), // Normalizing input
      });

      // Assuming your API returns { category: "happy" }
      setCategory(res.data.category);
    } catch (err) {
      console.error("Mood API error", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get movies based on the API response
  // We lowercase the category to match keys in curatedByMood
  const selectedMovies = category ? curatedByMood[category.toLowerCase()] : null;

  return (
    <section className="px-6 md:px-12 py-10 bg-neutral-900/60 backdrop-blur-md">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        What are you in the mood for?
      </h2>

      <div className="flex gap-3 max-w-xl mb-6">
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitMood()} // Allows pressing Enter to search
          placeholder="happy, sad, excited..."
          className="flex-1 px-4 py-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={submitMood}
          disabled={loading}
          className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition-colors disabled:opacity-50 text-white font-medium"
        >
          {loading ? "Thinking..." : "Recommend"}
        </button>
      </div>

      {loading && <p className="text-gray-400 animate-pulse">Analyzing your mood...</p>}

      {/* Show movies if the category exists in our data */}
      {!loading && selectedMovies && (
        <CuratedRow
          title={`Because you feel ${category}`}
          movies={selectedMovies}
        />
      )}

      {/* Show fallback if API returned a category we don't have in our local JSON */}
      {!loading && category && !selectedMovies && (
        <p className="text-gray-400">
          The AI suggested "{category}", but we don't have recommendations for that mood yet.
        </p>
      )}
    </section>
  );
};

export default MoodRecommender;