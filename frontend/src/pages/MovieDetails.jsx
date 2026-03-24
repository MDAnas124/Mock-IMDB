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
            className="max-w-6xl mx-auto pb-12"
        >
            <button onClick={() => navigate(-1)} className="font-head font-bold flex items-center gap-2 text-black border-3 border-black bg-white shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover px-4 py-2 mb-6 transition-all cursor-pointer">
                <ArrowLeft className="w-5 h-5" /> Back to discover
            </button>

            <div className="border-4 border-black shadow-neo-lg bg-white overflow-hidden min-h-[60vh] flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 border-b-4 md:border-b-0 md:border-r-4 border-black relative">
                    <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover min-h-[400px] grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
                </div>

                <div className="relative z-10 p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-start">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-head font-bold mb-6 text-black border-b-4 border-black pb-4 inline-block w-fit"
                    >
                        {movie.title}
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 mb-8 text-sm md:text-base text-black font-mono font-bold"
                    >
                        <div className="flex items-center gap-2 bg-[#FF90E8] border-2 border-black px-3 py-1 shadow-neo-sm">
                            <Calendar className="w-5 h-5" />
                            <span>{movie.releaseDate || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#FFC900] border-2 border-black px-3 py-1 shadow-neo-sm">
                            <Star className="w-5 h-5 fill-black" />
                            <span>{movie.source || 'OMDB'} DATA</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 shadow-neo-sm">
                            <Info className="w-5 h-5" />
                            <span>ID: {movie.tmdbId || movie.id || movie.imdbID || 'N/A'}</span>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-black font-mono font-medium leading-relaxed max-w-2xl bg-[#FFFFF0] border-3 border-black p-6 shadow-neo mt-4"
                    >
                        {movie.overview || 'No overview available for this title.'}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
