import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Star, ArrowLeft, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await api.get(`/movies/${id}`);
                setMovie(res.data);
            } catch (err) {
                console.error("Error fetching movie", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) return <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mt-20"></div>;
    if (!movie) return <div className="text-center mt-20 text-xl text-red-400">Movie not found</div>;

    const imageUrl = movie.posterPath || movie.poster_path
        ? `https://image.tmdb.org/t/p/w1280${movie.posterPath || movie.poster_path}`
        : 'https://via.placeholder.com/1280x720?text=No+Backdrop';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
        >
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to explore
            </button>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[60vh] flex items-end">
                <div className="absolute inset-0">
                    <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 w-full max-w-4xl">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                    >
                        {movie.title}
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base text-gray-300"
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span>{movie.releaseDate || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span>{movie.source} DATA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Info className="w-5 h-5 text-primary" />
                            <span>ID: {movie.tmdbId || movie.id}</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl"
                    >
                        {movie.overview}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
