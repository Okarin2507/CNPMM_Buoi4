import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await axiosInstance.get(`/products/${id}`);
            setProduct(res.data);
        };
        fetchDetail();
    }, [id]);

    if (!product) return <div>Đang tải...</div>;

    const handleQuantity = (type) => {
        if (type === 'inc' && quantity < product.stock) setQuantity(quantity + 1);
        if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="container mx-auto p-4 mt-6 bg-white rounded shadow-lg flex gap-8">
            {/* Swiper Hình Ảnh */}
            <div className="w-1/2">
                <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="h-96 rounded-lg">
                    {product.images && product.images.length > 0 ? product.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img src={img} alt="Product" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide><img src="https://via.placeholder.com/400" className="w-full h-full object-cover" /></SwiperSlide>
                    )}
                </Swiper>
            </div>

            {/* Thông tin chi tiết */}
            <div className="w-1/2 flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500">Danh mục: <span className="font-semibold">{product.category}</span></p>
                <p className="text-2xl text-red-600 font-bold">{product.price.toLocaleString()} VNĐ</p>

                <div className="flex gap-4 text-sm">
                    <span className="bg-gray-100 px-3 py-1 rounded">Tồn kho: {product.stock > 0 ? product.stock : <span className="text-red-500">Hết hàng</span>}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Đã bán: {product.sold}</span>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <span className="font-semibold">Số lượng:</span>
                    <button onClick={() => handleQuantity('dec')} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantity('inc')} className="px-3 py-1 bg-gray-200 rounded">+</button>
                </div>

                <button disabled={product.stock === 0} className={`mt-6 py-3 rounded text-white font-bold ${product.stock === 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {product.stock === 0 ? 'TẠM HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
                </button>
            </div>
        </div>
    );
}