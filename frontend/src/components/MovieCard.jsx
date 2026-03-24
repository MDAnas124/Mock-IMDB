import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
    // OMDB search results use capitalized keys: Poster, Title, Year, imdbID
    // Saved database entities use: posterPath, title, releaseDate, imdbId

    const poster = movie.Poster || movie.posterPath;
    const imageUrl = poster && poster !== 'N/A'
        ? poster
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    const title = movie.Title || movie.title;
    const id = movie.imdbID || movie.imdbId || movie.id;
    const releaseDate = movie.Year || movie.releaseDate;
    const overview = movie.Plot || movie.overview || '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-surface rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-colors group relative"
        >
            <Link to={`/movie/${id}`} className="block h-full">
                <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-sm text-gray-300 line-clamp-3">{overview.substring(0, 100)}</p>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-textMuted">
                        <span>{releaseDate ? releaseDate.substring(0, 4) : 'N/A'}</span>
                        {movie.imdbRating && (
                            <span className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                {movie.imdbRating}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default MovieCard;
