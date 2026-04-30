import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';


export const registerAdmin = async (req, res) => {
    const { email, password, role } = req.body || {};

    try {
        if (!email || !password || !role) {
            return res.status(400).json({
                status: "error",
                message: "all details are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }
        const hashPass = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashPass,
            role
        });
        return res.status(200).json({
            status: "success",
            message: "Admin registered successfully",
            data: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) return res.status(400).json({
            status: 'error',
            data: 'please provide your details to login'
        })

        let account = await User.findOne({ email });
        if (!account) return res.status(404).json({
            status: 'error',
            data: "User doesnot exist"
        })

        
        if (account.role !== "admin") {
            return res.status(403).json({
                message: "Not an admin account"
            });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) return res.status(400).json({
            status: 'error',
            data: "Invalid password"
        });

        const token = jwt.sign(
            {
                id: account.id,
                email: account.email,
                role: account.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: account.id,
                    email: account.email,
                },
                token,
            },
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}


export const getDashboardStats = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();

        return res.status(200).json({
            status: 'success',
            data: {
                users: users,
                products: products,
                orders: orders
            },
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
};