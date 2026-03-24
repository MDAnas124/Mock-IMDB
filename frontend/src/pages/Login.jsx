import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '', role: 'ROLE_USER' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/auth/login' : '/auth/register';

        try {
            const res = await api.post(endpoint, formData);
            if (isLogin) {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
                window.location.reload();
            } else {
                setIsLogin(true); // Switch to login after register
                alert('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Account Type</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                            >
                                <option value="ROLE_USER">Regular User</option>
                                <option value="ROLE_GUEST">Guest (View Only)</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="w-full btn-primary py-3 rounded-lg mt-6">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
