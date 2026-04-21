import express from "express";
import { protect } from "../middleware/checkUser.js";
import { checkout, getAllMyOrders, getBillingDetails } from "../controllers/checkoutController.js";


const router = express.Router();

router.route('/checkout')
    .get(protect, getBillingDetails)
    .post(protect, checkout)

router.route('/')
    .get(protect, getAllMyOrders)

export default router;