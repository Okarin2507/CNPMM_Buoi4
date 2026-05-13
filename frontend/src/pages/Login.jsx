import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.href = '/';
        } catch (err) {
            alert('Đăng nhập thất bại!');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập Thành Viên</h2>
                <input className="w-full border p-2 mb-4 rounded" placeholder="Tên đăng nhập" onChange={e => setUsername(e.target.value)} />
                <input className="w-full border p-2 mb-6 rounded" type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)} />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Đăng Nhập</button>
            </form>
        </div>
    );
}