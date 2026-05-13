import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Tech Audio Shop</h1>
            <div className="flex items-center gap-4">
                <span>Xin chào, {user?.username}</span>
                <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Đăng xuất</button>
            </div>
        </header>
    );
}