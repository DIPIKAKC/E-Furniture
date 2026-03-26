import express from "express";
import { addToCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/checkUser.js";


const router = express.Router();

router.route('/add')
    .post(protect, addToCart)

router.route('/clear')
    .delete(protect, removeFromCart)

export default router;