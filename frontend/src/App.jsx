import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';
import AdminPanel from './pages/AdminPanel';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
