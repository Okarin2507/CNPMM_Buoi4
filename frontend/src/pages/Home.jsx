import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            // Lấy danh sách, có áp dụng filter
            const res = await axiosInstance.get(`/products?search=${search}&category=${category}`);
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, category]); // Tự động load lại khi gõ search hoặc đổi category

    return (
        <div className="container mx-auto p-4 flex gap-6">
            {/* Sidebar Lọc */}
            <div className="w-1/4 bg-white p-4 rounded shadow h-fit">
                <h3 className="font-bold mb-4">Tìm kiếm & Lọc</h3>
                <input type="text" placeholder="Tìm tên sản phẩm..." className="w-full border p-2 mb-4 rounded"
                    onChange={(e) => setSearch(e.target.value)} />

                <h4 className="font-semibold mb-2">Danh mục</h4>
                <select className="w-full border p-2 rounded" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Tất cả</option>
                    <option value="Tai nghe">Tai nghe</option>
                    <option value="Chuột">Chuột</option>
                </select>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="w-3/4 grid grid-cols-3 gap-4">
                {products.map(p => (
                    <div key={p._id} className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
                        onClick={() => navigate(`/product/${p._id}`)}>
                        {/* Hiển thị ảnh đầu tiên làm ảnh bìa */}
                        <img src={p.images[0] || 'https://via.placeholder.com/150'} alt={p.name} className="w-full h-48 object-cover rounded mb-2" />
                        {p.isPromotion && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Khuyến mãi</span>}
                        <h3 className="font-bold mt-2">{p.name}</h3>
                        <p className="text-red-600 font-bold">{p.price.toLocaleString()} VNĐ</p>
                        <p className="text-sm text-gray-500">Đã bán: {p.sold}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}