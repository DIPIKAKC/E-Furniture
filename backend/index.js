import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);
console.log(process.env.CLOUD_NAME);

import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import checkoutRouter from './routes/checkoutRoutes.js';
import activityRouter from './routes/activityRoutes.js';

import express from 'express'
const app = express();


app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("API IS RUNNING");
})


app.use('/api', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', checkoutRouter);
app.use('/api', activityRouter);


mongoose.connect(process.env.MONGO_URI).then((val) => {
    app.listen(PORT, () => {
        console.log(`connected with database  and server is running on ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})
