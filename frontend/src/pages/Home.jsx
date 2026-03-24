import { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import { Search, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            // For OMDb this fetches a generic search like "Avengers"
            const res = await api.get('/movies/trending');
            setTrending(res.data.results || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get(`/movies/search?query=${searchQuery}`);
            setSearchResults(res.data.results || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <section className="text-center space-y-6 max-w-3xl mx-auto py-12">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
                >
                    Explore Cinema
                </motion.h1>
                <p className="text-xl text-textMuted">Discover your next favorite movie, read reviews, and explore trending content.</p>
                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search movies, actors, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary shadow-xl"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primaryHover p-2 rounded-full transition-colors text-white">
                        <Search className="w-5 h-5" />
                    </button>
                </form>
            </section>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <section>
                    <div className="flex items-center gap-2 mb-8">
                        {searchResults.length > 0 ? <Search className="text-primary w-6 h-6" /> : <TrendingUp className="text-primary w-6 h-6" />}
                        <h2 className="text-2xl font-bold">{searchResults.length > 0 ? `Search Results for "${searchQuery}"` : 'Popular Searches'}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {(searchResults.length > 0 ? searchResults : trending).map((movie, index) => (
                            <MovieCard key={movie.imdbID || movie.id || index} movie={movie} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
