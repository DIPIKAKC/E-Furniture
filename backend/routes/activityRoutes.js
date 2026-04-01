import express from "express";
import { admin, protect } from "../middleware/checkUser.js";
import { addReview, getProductReviews, toggleLike, updateReview } from "../controllers/activityController.js";

const router = express.Router();

//like
router.route("/like/:productId")
    .post(protect, toggleLike);

//reviews
//add
router.route("/review/:productId")
    .get(getProductReviews)
    .post(protect, addReview)

//update
router.route("/review/:reviewId")
    .patch(protect, updateReview)


export default router;