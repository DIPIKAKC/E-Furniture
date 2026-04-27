import express from 'express'
import { getUser, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/checkUser.js';

const router = express.Router();

router.route('/register')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

router.route('/user')
    .get(protect, getUser)

router.route('/profile')
    .patch(protect, updateUserProfile)

export default router;