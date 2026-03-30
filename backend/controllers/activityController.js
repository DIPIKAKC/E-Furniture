import Product from "../models/Product.js";

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
