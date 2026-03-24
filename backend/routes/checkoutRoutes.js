import express from "express";
import { protect } from "../middleware/checkUser.js";
import { checkout } from "../controllers/checkoutController.js";


const router = express.Router();

router.route('/checkout')
    .post(protect, checkout)

export default router;