import express from "express";
import { admin, protect } from "../middleware/checkUser.js";
import { addReview, deleteReview, getMyLikedProducts, getProductReviews, toggleLike, updateReview } from "../controllers/activityController.js";

const router = express.Router();

//like
router.route("/like/:productId")
    .post(protect, toggleLike);

router.route("/like")
    .get(protect, getMyLikedProducts)

//reviews
//add, get
router.route("/review/:productId")
    .get(getProductReviews)
    .post(protect, addReview)

//update
router.route("/review/:reviewId")
    .patch(protect, updateReview)
    .delete(protect, deleteReview)


export default router;