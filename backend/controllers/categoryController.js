import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    const { name } = req.body || {};
    try {
        const category = await Category.create({
            name
        });

        res.status(201).json({
            status: "success",
            category
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            status: "success",
            categories
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};