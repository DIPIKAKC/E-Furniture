import mongoose from 'mongoose';
import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        let {
            productName,
            price,
            description,
            category,
            tags,
            sizes,
            colors,
        } = req.body || {};


        const safeParse = (val) => {
            try {
                return val ? JSON.parse(val) : [];
            } catch {
                return [];
            }
        };

        sizes = safeParse(sizes);
        colors = safeParse(colors);
        tags = safeParse(tags);


        //from multer
        const images =
            req.files?.map(file => file.path) || [];


        if (!productName || !price || !description || !category) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid category"
            });
        }

        if (!images.length) {
            return res.status(400).json({
                status: "error",
                message: "Please provide all required fields"
            });
        }


        const newProduct = await Product.create({
            productName,
            price,
            description,
            category,
            tags,
            sizes,
            colors,
            images //array of cloudinary urls
        });

        return res.status(201).json({
            status: "success",
            message: "Product added successfully",
            data: newProduct
        });

    } catch (error) {
        console.log("🔥 BACKEND ERROR:", error);
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            productName,
            price,
            description,
            category,
            tags,
            sizes,
            colors,
            rating,
            isHero
        } = req.body || {};
        const images = req.files?.map(file => file.path) ?? [];

        const updateData = {
            ...(productName && { productName }),
            ...(price && { price }),
            ...(description && { description }),
            ...(category && { category }),
            ...(rating && { rating }),
            ...(tags && { tags: JSON.parse(tags) }),
            ...(sizes && { sizes: JSON.parse(sizes) }),
            ...(colors && { colors: JSON.parse(colors) }),


            ...(images.length > 0 && { images }),
            
            rating,
            isHero
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const isExist = await Product.findById(id);
        if (!isExist) return res.status(404).json({
            status: 'error',
            data: 'Post not found'
        });

        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const { category, tag } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (tag) {
            filter.tags = { $in: [tag] };
        }

        const products = await Product.find(filter).populate("category");

        if (!products) {
            return res.status(404).json({
                status: "error",
                message: "No products found"
            })
        }

        const total = await Product.countDocuments();
        return res.status(200).json({
            status: "success",
            products: products,
            total: total
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find({
            rating: { $gt: 0 }   // only products with rating > 0
        })
            .sort({ rating: -1 })
            .limit(5);

        return res.status(200).json({
            status: "success",
            products: products
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
};

export const getRecentProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(2);

        return res.status(200).json({
            status: "success",
            products: products
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
};

export const getNewArrival = async (req, res) => {
    try {
        const products = await Product.findOne()
            .sort({ createdAt: -1 })

        return res.status(200).json({
            status: "success",
            products: products
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const singleProduct = await Product.findById(id).populate("category");
        return res.status(200).json({
            status: "success",
            singleProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const getHeroProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ isHero: true });

        return res.status(200).json({
            status: "success",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}



