import Product from "../models/Product.js";

export const globalSearch = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                status: "error",
                message: "Search query is required"
            });
        }

        //posts by content
        const products = await Product.find({
            $or: [
                { productName: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { tags: { $regex: q, $options: "i" } }
            ]
        })
            .populate("category", "name")
            .limit(20)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            products
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

