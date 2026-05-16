import { useNavigate } from 'react-router-dom';
import { LogOut, User, ShoppingBag } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div 
                    className="flex items-center gap-2 cursor-pointer group" 
                    onClick={() => navigate('/')}
                >
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                        <ShoppingBag size={22} />
                    </div>
                    <span className="text-xl font-black tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        TECH AUDIO
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <User size={14} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Xin chào, <span className="font-bold">{user?.username}</span></span>
                    </div>

                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors font-semibold text-sm border border-red-100"
                    >
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
        </header>
    );
}