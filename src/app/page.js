"use client";

import { useState } from "react";

export default function Home() {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMovie(null);
    setSummary("");
    setLoading(true);

    try {
      
      if (!movieId.startsWith("tt")) {
        setError("IMDb ID must start with 'tt'");
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/movie?id=${movieId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setMovie(data);


      const aiRes = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plot: data.Plot,
          rating: data.imdbRating,
          title: data.Title,
        }),
      });

      const aiData = await aiRes.json();

      if (aiData.result) {
        setSummary(aiData.result);
      }

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-4xl font-bold mb-8">
        🎬 AI Movie Insight Builder
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-wrap justify-center"
      >
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g. tt0133093)"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="px-4 py-2 rounded text-white w-64"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="mt-6 flex items-center gap-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          <span className="text-gray-300">Generating AI Insight...</span>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg max-w-md w-full text-center">
          {error}
        </div>
      )}

      {movie && (
        <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl max-w-2xl w-full transition-all duration-500 hover:scale-[1.02]">

          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded-xl mb-6 shadow-lg"
          />

          <h2 className="text-3xl font-bold mb-3 text-white">
            {movie.Title}
          </h2>

          <p className="text-gray-300"><strong>Year:</strong> {movie.Year}</p>
          <p className="text-gray-300"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p className="text-gray-300"><strong>Cast:</strong> {movie.Actors}</p>

          <p className="mt-4 text-gray-200">
            <strong>Plot:</strong> {movie.Plot}
          </p>

          {summary && (
            <div className="mt-6 bg-black/40 p-4 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                🤖 AI Insight
              </h3>
              <p className="whitespace-pre-line text-gray-200 leading-relaxed">
                {summary}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
