import { useEffect, useState } from "react";
import { isCancel } from "axios";
import { getPopularMovies, searchMovies } from "./api/tmdb";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");   
  const [search, setSearch] = useState(""); 
  
  // Modal and pagination states
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1); // New page state!

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    
    // Pass the page state to API calls
    const request = search
      ? searchMovies(search, page, controller.signal)
      : getPopularMovies(page, controller.signal);
      
    request
      .then((data) => { 
        // If we are on page 1, replace movies. Otherwise, add to the bottom!
        setMovies(prev => page === 1 ? data : [...prev, ...data]); 
        setLoading(false); 
      })
      .catch((err) => {
        if (isCancel(err)) return; 
        setError("Oh no! Couldn't load the movies :( ) Try again later.");
        setLoading(false);
      });
      
    return () => controller.abort(); 
  }, [search, page]); // Re-run whenever search OR page changes

  return (
    <div className="page-container">
        <div className="pretty-sidebar left">
          <img 
            src="https://i.pinimg.com/1200x/42/44/2b/42442b80d83cff744aaa9a2d24301b73.jpg" 
            alt="adorable mushroom" 
            className="cute-photo" 
            style={{ maxWidth: "250px", maxHeight: "300px", objectFit: "cover" }} 
          />
        </div>

        <div className="center-layout">
            <div className="game-wrapper">
                <h1 className="site-title"> Little Movie Explorer 🍂</h1>
                
                <form
                    className="cute-search-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSearch(query.trim());
                        setPage(1); // Reset to page 1 on a new search
                    }}
                >
                    <input
                        className="cute-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for magical movies… 🌿"
                    />
                    <button type="submit" className="toggle-btn">Search 🌸</button>
                </form>

                <div className="game">
                    {/* Only show initial loading text on page 1 */}
                    {loading && page === 1 && <p className="loading-text">Loading fun movies... 🌷</p>}
                    {error && <p className="error-text">{error}</p>}
                    
                    {/* Empty State Implementation */}
                    {!loading && !error && movies.length === 0 && search && (
                        <div className="empty-state">
                            Oh no! No results for '{search}' 🥀
                        </div>
                    )}
                    
                    {movies.length > 0 && (
                        <>
                            <div className="game-board grid-layout">
                                {movies.map((m, index) => (
                                    <MovieCard 
                                        key={`${m.id}-${index}`} // Fixes duplicate keys on load more
                                        movie={m} 
                                        onClick={() => setSelectedMovie(m)} 
                                    />
                                ))}
                            </div>
                            
                            {/* Load More Button */}
                            <button 
                                className="toggle-btn load-more-btn" 
                                onClick={() => setPage(p => p + 1)}
                                disabled={loading}
                            >
                                {loading ? "Growing... 🌱" : "Load more movies 🌻"}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bottom-gallery">
                <img src="https://i.pinimg.com/736x/a5/cc/a7/a5cca7fd6f781ca7e168846c4c699053.jpg" alt="cutie bunnies" className="cute-photo left-tilt" />
                <img src="https://i.pinimg.com/1200x/22/a2/fa/22a2fa41a95c05f0caba5c82a81d61f2.jpg" alt="reading/movie nook" className="cute-photo right-tilt" />
            </div>
        </div>

        {/* Modal Implementation */}
        {selectedMovie && (
            <div className="cute-modal-overlay" onClick={() => setSelectedMovie(null)}>
                <div className="cute-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={() => setSelectedMovie(null)}>✖</button>
                    <h2>✨ {selectedMovie.title} ✨</h2>
                    <p className="modal-overview">🌿 {selectedMovie.overview} 🌿</p>
                </div>
            </div>
        )}
    </div>
  );
}