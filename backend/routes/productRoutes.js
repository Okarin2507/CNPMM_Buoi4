const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, productController.getProducts); // Yêu cầu đăng nhập mới xem được
router.get('/:id', authMiddleware, productController.getProductById);
router.get('/:id/similar', authMiddleware, productController.getSimilarProducts);
module.exports = router;