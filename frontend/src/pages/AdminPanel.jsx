import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { ShieldAlert, Plus, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [manualMovies, setManualMovies] = useState([]);
    const [formData, setFormData] = useState({ title: '', overview: '', releaseDate: '' });

    useEffect(() => {
        const checkAccess = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || user.role !== 'ROLE_ADMIN') {
                navigate('/');
            }
        };
        checkAccess();
        fetchManualMovies();
    }, [navigate]);

    const fetchManualMovies = async () => {
        try {
            const res = await api.get('/admin/movies');
            setManualMovies(res.data);
        } catch (error) {
            console.error("Error fetching manual movies", error);
        }
    };

    const handleCreateMovie = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/movies', formData);
            setFormData({ title: '', overview: '', releaseDate: '' });
            fetchManualMovies();
            alert('Movie added manually!');
        } catch (err) {
            alert('Failed to add movie');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 py-8">
            <div className="flex items-center gap-4 text-red-500 border-b border-white/10 pb-6">
                <ShieldAlert className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Plus className="w-6 h-6 text-primary" /> Add Custom Movie
                    </h2>
                    <form onSubmit={handleCreateMovie} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                            <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Release Date</label>
                            <input type="date" value={formData.releaseDate} onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Overview</label>
                            <textarea required rows="4" value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary bg-red-600 hover:bg-red-700 mt-4">Save Entry</button>
                    </form>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Film className="w-6 h-6 text-primary" /> Manually Added Database
                    </h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {manualMovies.length === 0 && <p className="text-gray-400">No manual entries yet.</p>}
                        {manualMovies.map(movie => (
                            <div key={movie.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex flex-col">
                                <span className="font-semibold text-lg">{movie.title}</span>
                                <span className="text-xs text-gray-500">{movie.releaseDate}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPanel;
