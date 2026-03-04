export default function SearchForm({
  movieId,
  setMovieId,
  handleSubmit
}) {
  return (
   <form
  onSubmit={handleSubmit}
  className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
>
  <input
    type="text"
    placeholder="Enter IMDb ID (e.g. tt0133093)"
    value={movieId}
    onChange={(e) => setMovieId(e.target.value)}
    className="px-4 py-3 rounded-lg text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    required
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 rounded-lg font-semibold"
  >
    Search
  </button>
</form>
  );
}