import express from "express";
import { protect } from "../middleware/checkUser.js";
import { toggleLike } from "../controllers/activityController.js";

const router = express.Router();

router.route("/like/:productId")
    .post(protect, toggleLike);


export default router;