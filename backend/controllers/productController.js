const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { search, category, sort, isPromotion, minPrice, maxPrice } = req.query;
        let query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;
        if (isPromotion === 'true') query.isPromotion = true;
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let productsQuery = Product.find(query);
        if (sort === 'bestseller') productsQuery = productsQuery.sort({ sold: -1 });
        else if (sort === 'newest') productsQuery = productsQuery.sort({ createdAt: -1 });

        const result = await productsQuery.exec();
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

exports.getSimilarProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

        const similar = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(4);

        res.json(similar);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};