export default function MovieCard({ movie }) {
  return (
    <div className="mt-10 bg-white text-black p-6 rounded-lg shadow-lg max-w-xl w-full">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full rounded mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">
        {movie.Title}
      </h2>

      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <p><strong>Cast:</strong> {movie.Actors}</p>

      <p className="mt-4">
        <strong>Plot:</strong> {movie.Plot}
      </p>
    </div>
  );
}