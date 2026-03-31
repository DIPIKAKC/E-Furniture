import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const toggleLike = async (req, res) => {
    try {
        const productId = req.params?.productId;
        const userId = req.user?.id;

        const product = await Product.findById(productId);

        const liked = product.likes.includes(userId);

        if (liked) {
            product.likes.pull(userId); // unlike
        } else {
            product.likes.push(userId); // like
        }

        await product.save();

        res.status(200).json({
            success: true,
            likesCount: product.likes.length
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}


//Review

export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req?.body;
        const productId = req.params?.productId;
        const userId = req.user?.id;

        const existingReview = await Review.findOne({
            product: productId,
            user: userId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product"
            });
        }

        const review = await Review.create({
            product: productId,
            user: userId,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

