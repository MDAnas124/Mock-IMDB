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
        <nav className="sticky top-0 z-50 bg-[#FF90E8] border-b-3 border-black shadow-neo p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-head font-bold text-black border-2 border-transparent hover:border-black px-2 py-1 transition-all">
                    <Film className="w-6 h-6" />
                    <span className="bg-white px-2 py-1 border-2 border-black">CineVault</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="font-head font-bold text-black hover:bg-white hover:border-black border-2 border-transparent px-3 py-1 transition-all">Discover</Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="font-head font-bold flex items-center gap-1 text-black hover:bg-white border-2 border-transparent hover:border-black px-3 py-1 transition-all">
                                    <Shield className="w-4 h-4" /> Admin
                                </Link>
                            )}
                            <span className="font-head font-bold flex items-center gap-1 text-black px-3 py-1 border-2 border-black bg-white shadow-neo-sm">
                                <User className="w-4 h-4" /> {user.username}
                            </span>
                            <button onClick={handleLogout} className="font-head font-bold border-2 border-black hover:bg-black hover:text-[#FF90E8] bg-white text-black shadow-neo flex items-center gap-1 px-4 py-1.5 transition-all">
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-secondary flex items-center gap-2">
                            <User className="w-4 h-4" /> Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
