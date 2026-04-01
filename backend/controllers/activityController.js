import Product from "../models/Product.js";
import Review from "../models/Review.js";
import User from "../models/User.js";


//LIKE
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

export const getMyLikedProducts = async (req, res) => {
    try {

        const userId = req.user?.id;

        //checking if "userId" exists in the "likes" array
        const likedProducts = await Product.find({ "likes": userId });

        //find never returns null, it returns []. so "length" instead of '!likedProducts'
        if (likedProducts.length === 0) {
            res.status(400).json({
                status: "error",
                message: "You have no liked products."
            });
        }

        res.status(200).json({
            success: true,
            data: likedProducts
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}






//REVIEW
export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req?.body;
        const productId = req.params?.productId;
        const userId = req.user?.id;

        const existingReview = await Review.findOne({
            product: productId,
            user: userId
        });

        // if (existingReview) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "You already reviewed this product"
        //     });
        // }

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

export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const reviewId = req.params?.reviewId;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review does not exist"
            });
        }

        review.rating = rating;
        review.comment = comment;

        const updatedReview = await review.save();

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: updatedReview
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const productId = req.params?.productId;

        const reviews = await Review.find({ product: productId })
            .populate("user", "username");

        res.status(200).json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params?.reviewId;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review does not exist"
            });
        }

        if (review?.user.toString() !== req.user?.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await Review.findByIdAndDelete(review);

        res.status(200).json({
            success: true,
            message: "Review deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};