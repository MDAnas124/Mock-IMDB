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
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border-3 border-black shadow-neo hover:shadow-neo-hover active:shadow-neo-active hover:translate-x-[2px] transition-all group relative flex flex-col h-full"
        >
            <Link to={`/movie/${id}`} className="block h-full flex flex-col">
                <div className="relative aspect-[2/3] overflow-hidden border-b-3 border-black">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <p className="font-mono text-black font-bold text-center border-2 border-black bg-white p-2 shadow-neo-sm">View Details</p>
                    </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-white group-hover:bg-[#FFC900] transition-colors">
                    <h3 className="font-head font-bold text-xl line-clamp-1 mb-2 text-black transition-colors">
                        {title}
                    </h3>
                    <div className="flex justify-between items-center text-sm font-mono font-bold text-black">
                        <span className="border-2 border-black px-2 py-0.5 bg-[#FF90E8]">{releaseDate ? releaseDate.substring(0, 4) : 'N/A'}</span>
                        {movie.imdbRating && (
                            <span className="flex items-center gap-1 border-2 border-black px-2 py-0.5 bg-white">
                                <Star className="w-4 h-4 fill-black text-black" />
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
