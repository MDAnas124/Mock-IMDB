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
        <div className="space-y-12 pb-12">
            <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-5xl md:text-7xl font-head font-bold text-black border-4 border-black inline-block px-8 py-4 bg-[#FF90E8] shadow-neo-lg"
                >
                    Explore Cinema
                </motion.h1>
                <div className="mt-6">
                    <p className="text-xl text-black font-mono font-bold bg-white border-2 border-black inline-block px-4 py-2 shadow-neo-sm">Discover your next favorite movie, read reviews, and explore trending content.</p>
                </div>
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-12 flex items-center">
                    <input
                        type="text"
                        placeholder="Search movies, actors, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full neo-input text-lg py-4 pl-6 pr-14 flex-1 text-black font-mono font-bold"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFC900] border-3 border-black text-black p-2 hover:bg-yellow-400 hover:translate-x-[2px] hover:translate-y-[2px] shadow-neo-hover active:shadow-neo-active transition-all cursor-pointer z-10">
                        <Search className="w-6 h-6" />
                    </button>
                </form>
            </section>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin h-12 w-12 border-4 border-black border-t-[#FF90E8] border-r-[#FFC900] rounded-none shadow-neo"></div>
                </div>
            ) : (
                <section>
                    <div className="flex items-center gap-2 mb-8 bg-white border-3 border-black p-4 shadow-neo inline-flex">
                        {searchResults.length > 0 ? <Search className="text-black w-6 h-6" /> : <TrendingUp className="text-black w-6 h-6" />}
                        <h2 className="text-2xl font-head font-bold text-black">{searchResults.length > 0 ? `Search Results for "${searchQuery}"` : 'Popular Searches'}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
