import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const registerAdmin = async (req, res) => {
    const { email, password } = req.body || {};

    try {
        if (!email || !password) {
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
        });
        return res.status(200).json({
            status: "success",
            message: "Admin registered successfully",
            data: {
                id: newUser._id,
                email: newUser.email,
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

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) return res.status(400).json({
            status: 'error',
            data: "Invalid password"
        });

        const token = jwt.sign(
            { id: account.id, },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            status: 'success',
            data: {
                admin: {
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
