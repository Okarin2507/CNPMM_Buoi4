const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, productController.getProducts); // Yêu cầu đăng nhập mới xem được
router.get('/:id', authMiddleware, productController.getProductById);
module.exports = router;