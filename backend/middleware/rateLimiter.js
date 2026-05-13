const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const redisClient = require('../config/redisClient');

// Bộ giới hạn chung cho toàn bộ API
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    limit: 100, // Giới hạn mỗi IP là 100 request mỗi cửa sổ 15 phút
    standardHeaders: 'draft-7', // Sử dụng RateLimit headers mới nhất
    legacyHeaders: false, // Tắt X-RateLimit-* headers cũ
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: {
        status: 429,
        message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
    }
});

// Bộ giới hạn nghiêm ngặt hơn cho các tính năng nhạy cảm (Đăng nhập, Đăng ký)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 giờ
    limit: 5, // Chỉ cho phép 5 lần thử sai mỗi giờ
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    message: {
        status: 429,
        message: 'Quá nhiều lần thử đăng nhập thất bại. Vui lòng thử lại sau 1 giờ.'
    }
});

module.exports = { globalLimiter, authLimiter };
