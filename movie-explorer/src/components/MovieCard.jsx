const IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie, onClick }) {
  return (
    <article className="cute-card" onClick={onClick}>
      {movie.poster_path ? (
        <img src={`${IMG_BASE}${movie.poster_path}`} alt={`${movie.title} poster`} className="cute-photo" />
      ) : (
        <div className="no-poster">🌿 No image 🌿</div>
      )}
      <h3 className="card-title">✨ {movie.title} ✨</h3>
      <p className="card-info">
        {movie.release_date?.slice(0, 4)} 🌷 ★ {movie.vote_average.toFixed(1)}
      </p>
    </article>
  );
}