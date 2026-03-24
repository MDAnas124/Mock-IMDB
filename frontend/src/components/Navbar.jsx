import { Link, useNavigate } from 'react-router-dom';
import { Film, User, LogOut, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-white transition-colors">
                    <Film className="w-6 h-6" />
                    <span>CineVault</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-primary transition-colors">Discover</Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors">
                                    <Shield className="w-4 h-4" /> Admin
                                </Link>
                            )}
                            <span className="flex items-center gap-1 text-sm text-textMuted">
                                <User className="w-4 h-4" /> {user.username}
                            </span>
                            <button onClick={handleLogout} className="text-sm border border-white/20 hover:border-red-500 hover:text-red-500 px-3 py-1 rounded transition-colors flex items-center gap-1">
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary flex items-center gap-2">
                            <User className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
