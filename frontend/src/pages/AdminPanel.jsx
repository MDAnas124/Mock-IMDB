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
        <div className="max-w-5xl mx-auto space-y-12 py-12 px-4">
            <div className="flex items-center gap-4 bg-[#FF90E8] border-4 border-black p-6 shadow-neo-lg text-black w-fit mb-12 transform -rotate-1">
                <ShieldAlert className="w-10 h-10" />
                <h1 className="text-4xl font-head font-bold">Admin Dashboard</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="neo-panel p-8">
                    <h2 className="text-2xl font-head font-bold mb-8 flex items-center gap-3 text-black border-b-4 border-black pb-4">
                        <Plus className="w-8 h-8 p-1 bg-[#FFC900] border-2 border-black" /> Add Custom Movie
                    </h2>
                    <form onSubmit={handleCreateMovie} className="space-y-6">
                        <div>
                            <label className="block text-md font-head font-bold text-black mb-2">Title</label>
                            <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="neo-input w-full bg-[#FFFFF0]" />
                        </div>
                        <div>
                            <label className="block text-md font-head font-bold text-black mb-2">Release Date</label>
                            <input type="date" value={formData.releaseDate} onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })} className="neo-input w-full bg-[#FFFFF0]" />
                        </div>
                        <div>
                            <label className="block text-md font-head font-bold text-black mb-2">Overview</label>
                            <textarea required rows="4" value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} className="neo-input w-full bg-[#FFFFF0] resize-y"></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary text-xl mt-6 py-3">Save Entry</button>
                    </form>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="neo-panel p-8 bg-[#FFFFF0]">
                    <h2 className="text-2xl font-head font-bold mb-8 flex items-center gap-3 text-black border-b-4 border-black pb-4">
                        <Film className="w-8 h-8 p-1 bg-white border-2 border-black" /> Manual Database
                    </h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {manualMovies.length === 0 && <p className="text-black font-mono font-bold bg-white border-2 border-black p-4 shadow-neo-sm">No manual entries yet.</p>}
                        {manualMovies.map(movie => (
                            <div key={movie.id} className="bg-white border-3 border-black p-4 shadow-neo-sm flex flex-col hover:bg-[#FFC900] transition-colors cursor-pointer">
                                <span className="font-head font-bold text-xl text-black">{movie.title}</span>
                                <span className="text-sm font-mono font-bold mt-1 text-black bg-white inline-block w-fit px-2 border-2 border-black">{movie.releaseDate}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPanel;
