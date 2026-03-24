import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1); // 1: Credentials, 2: Genres
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ 
        fullName: '',
        email: '',
        username: '', 
        password: '', 
        confirmPassword: '',
        role: 'ROLE_USER',
        favoriteGenres: [] 
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const GENRES = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller"];

    const toggleGenre = (genre) => {
        setFormData(prev => ({
            ...prev,
            favoriteGenres: prev.favoriteGenres.includes(genre)
                ? prev.favoriteGenres.filter(g => g !== genre)
                : [...prev.favoriteGenres, genre]
        }));
    };

    const handleContinue = (e) => {
        e.preventDefault();
        setError('');
        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            // Move to genre step instead of submitting
            setStep(2);
        } else {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setError('');
        
        // Fixed Admin Account Bypass
        if (isLogin && formData.username === 'admin' && formData.password === 'admin123') {
            localStorage.setItem('user', JSON.stringify({ username: 'Admin', role: 'ROLE_ADMIN', token: 'admin-mock-token' }));
            navigate('/');
            window.location.reload();
            return;
        }

        const endpoint = isLogin ? '/auth/login' : '/auth/register';

        try {
            const res = await api.post(endpoint, formData);
            if (isLogin) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
                window.location.reload();
            } else {
                // Auto login after registration
                localStorage.setItem('user', JSON.stringify({ username: formData.username, role: formData.role, token: 'mock-registered-token' }));
                navigate('/');
                window.location.reload();
            }
        } catch (err) {
            // If backend is down or fails, fallback to hardcoded mock for demonstration
            if (!isLogin) {
                localStorage.setItem('user', JSON.stringify({ username: formData.username, role: formData.role, genres: formData.favoriteGenres, token: 'mock-registered-token' }));
                navigate('/');
                window.location.reload();
            } else {
                setError(err.response?.data?.error || 'Authentication failed');
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-4 border-black shadow-neo-lg p-8 w-full max-w-lg relative"
            >
                <h2 className="text-3xl font-head font-bold text-black border-b-4 border-black pb-4 text-center mb-6 bg-[#FFC900] shadow-neo -mt-12 -mx-4">
                    {step === 2 ? 'Select Favorite Genres' : (isLogin ? 'Welcome Back' : 'Create Account')}
                </h2>

                {error && <div className="bg-[#FF90E8] border-3 border-black text-black font-mono shadow-neo-sm p-3 mb-6">{error}</div>}

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.form 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={isLogin ? handleSubmit : handleContinue} 
                            className="space-y-6"
                        >
                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-md font-head font-bold text-black mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="neo-input w-full bg-[#FFFFF0]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md font-head font-bold text-black mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="neo-input w-full bg-[#FFFFF0]"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-md font-head font-bold text-black mb-2">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="neo-input w-full bg-[#FFFFF0]"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-md font-head font-bold text-black mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="neo-input w-full bg-[#FFFFF0] pr-12"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-md font-head font-bold text-black mb-2">Confirm Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="neo-input w-full bg-[#FFFFF0]"
                                    />
                                </div>
                            )}

                            <button type="submit" className="w-full btn-primary text-xl mt-8 py-3">
                                {isLogin ? 'Sign In' : 'Continue'}
                            </button>
                            
                            <div className="mt-8 pt-6 border-t-4 border-black text-center">
                                <p className="text-sm font-mono font-bold text-black">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="bg-[#FF90E8] border-2 border-black px-2 py-1 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-neo-active transition-all cursor-pointer ml-2">
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6 text-center"
                        >
                            <p className="text-lg font-mono font-bold mb-4">What kind of movies do you love?</p>
                            <div className="flex flex-wrap gap-3 justify-center mb-8">
                                {GENRES.map(genre => {
                                    const isSelected = formData.favoriteGenres.includes(genre);
                                    return (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => toggleGenre(genre)}
                                            className={`font-head font-bold px-4 py-2 border-3 border-black transition-all shadow-neo-sm hover:shadow-neo-active hover:translate-x-[1px] hover:translate-y-[1px] ${isSelected ? 'bg-[#FF90E8] text-black pr-2 flex items-center gap-2' : 'bg-white text-black'}`}
                                        >
                                            {genre} {isSelected && <CheckCircle className="w-4 h-4 inline-block" />}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setStep(1)} className="w-1/3 font-head font-bold bg-white text-black border-3 border-black shadow-neo px-4 py-3 hover:shadow-neo-active hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    Back
                                </button>
                                <button type="button" onClick={handleSubmit} className="w-2/3 btn-primary text-xl py-3">
                                    Complete Sign Up
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Login;
