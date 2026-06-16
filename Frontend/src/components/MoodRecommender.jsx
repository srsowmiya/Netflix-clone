import React, { useState } from "react";
import axios from "axios";
import CuratedRow from "./CuratedRow";
import { curatedByMood } from "../data/curatedMovies";

const MoodRecommender = () => {
  const [mood, setMood] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const submitMood = async () => {
    if (!mood.trim()) return;

    setLoading(true);
    setCategory("");

    try {
      const res = await axios.post(
        "https://netflix-clone-oxc9.onrender.com",
        {
          mood: mood.toLowerCase().trim(),
        }
      );

      console.log("FULL API RESPONSE:");
      console.log(JSON.stringify(res.data, null, 2));

      // safe extraction
      const detectedMood = res.data?.category
        ?.trim()
        .toLowerCase();

      console.log("Detected mood:", detectedMood);

      setCategory(detectedMood);

    } catch (err) {
      console.error(
        "Mood API error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // safer lookup
  const selectedMovies =
    category &&
    curatedByMood[category]
      ? curatedByMood[category]
      : null;

  console.log("Current Category:", category);
  console.log("Selected Movies:", selectedMovies);

  return (
    <section className="px-6 md:px-12 py-10 bg-neutral-900/60 backdrop-blur-md">

      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
        What are you in the mood for?
      </h2>

      <div className="flex gap-3 max-w-xl mb-6">

        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && submitMood()
          }
          placeholder="happy, sad, excited..."
          className="flex-1 px-4 py-3 rounded bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={submitMood}
          disabled={loading}
          className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition text-white disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Recommend"}
        </button>

      </div>

      {loading && (
        <p className="text-gray-400 animate-pulse">
          Analyzing your mood...
        </p>
      )}

      {!loading && selectedMovies && (
        <CuratedRow
          title={`Because you feel ${category}`}
          movies={selectedMovies}
        />
      )}

      {!loading && category && !selectedMovies && (
        <div className="text-red-400">

          <p>
            No curated movies found for:
            {" "}
            {category}
          </p>

          <p className="text-sm mt-2">
            Check curatedMovies.js keys
          </p>

        </div>
      )}

    </section>
  );
};

export default MoodRecommender;