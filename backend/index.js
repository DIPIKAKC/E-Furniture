import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);
console.log(process.env.CLOUD_NAME);

import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import checkoutRouter from './routes/checkoutRoutes.js';
import activityRouter from './routes/activityRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import searchRouter from './routes/searchRoutes.js';

import express from 'express'
const app = express();


app.use(cors({
    origin: ["http://localhost:5174",
        "https://e-furniture-ivory.vercel.app/"
    ], //frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("API IS RUNNING");
})


app.use('/api', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', checkoutRouter);
app.use('/api', activityRouter);
app.use('/api/category', categoryRouter);
app.use('/api', searchRouter);


mongoose.connect(process.env.MONGO_URI).then((val) => {
    app.listen(PORT, () => {
        console.log(`connected with database  and server is running on ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})
