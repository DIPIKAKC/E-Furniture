import express from 'express' 
import dotenv from "dotenv"; 
import mongoose from 'mongoose';

import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("API IS RUNNING");
})


app.use('/api',userRouter);


mongoose.connect(process.env.MONGO_URI).then((val) => {
    app.listen(PORT, () => {
        console.log(`connected with database  and server is running on ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})
