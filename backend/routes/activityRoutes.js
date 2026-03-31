import express from "express";
import { admin, protect } from "../middleware/checkUser.js";
import { addReview, toggleLike } from "../controllers/activityController.js";

const router = express.Router();

//like
router.route("/like/:productId")
    .post(protect, toggleLike);

//review
router.post("/review/:productId", protect, addReview);


export default router;