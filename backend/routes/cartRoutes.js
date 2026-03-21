import express from "express";
import { addToCart } from "../controllers/cartController.js";
import { protect } from "../middleware/checkUser.js";


const router = express.Router();

router.route('/add')
    .post(protect, addToCart)

export default router;