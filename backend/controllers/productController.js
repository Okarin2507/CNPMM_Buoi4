const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { search, category, sort, isPromotion } = req.query;
        let query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;
        if (isPromotion) query.isPromotion = true;

        let products = Product.find(query);
        if (sort === 'bestseller') products = products.sort({ sold: -1 });
        if (sort === 'newest') products = products.sort({ createdAt: -1 });

        const result = await products.exec();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};