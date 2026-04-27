import express from "express";
import { addToCart, emptyCart, getAllCartItems, removeCartItem, updateCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/checkUser.js";


const router = express.Router();

router.route('/')
    .get(protect, getAllCartItems)

router.route('/add')
    .post(protect, addToCart)

router.route('/update')
    .patch(protect, updateCartItem)

router.route('/clear')
    .delete(protect, emptyCart)

router.route('/:productId')
    .delete(protect, removeCartItem)


export default router;