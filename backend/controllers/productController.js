import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
    try {
        let {
            productName,
            price,
            description,
            category,
            tags,
            sizes,
            colors,
        } = req.body || {};

        if (sizes) sizes = JSON.parse(sizes);
        if (colors) colors = JSON.parse(colors);
        if (tags) tags = JSON.parse(tags);


        //from multer
        const image = req.file?.path.replace(/\\/g, "/");
        console.log(req.file)

        if (!productName || !price || !description || !category || !image) {
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
            image
        });

        return res.status(201).json({
            status: "success",
            message: "Product added successfully",
            data: newProduct
        });

    } catch (error) {
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
        } = req.body || {};
        const image = req.file?.path.replace(/\\/g, "/");

        const updateData = {
            ...(productName && { productName }),
            ...(price && { price }),
            ...(description && { description }),
            ...(category && { category }),
            ...(tags && { tags: tags }),
            ...(sizes && { sizes: sizes }),
            ...(colors && { colors: colors }),
            ...(image && { image }),
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
        const products = await Product.find();

        if (!products) {
            return res.status(404).json({
                status: "error",
                message: "No products found"
            })
        }
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
}

export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find()
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

export const getProductById = async (req, res) => {

}
