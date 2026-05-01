import express from 'express'
import { getDashboardStats, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { admin } from '../middleware/checkUser.js';

const router = express.Router();

router.route('/register')
    .post(admin, registerAdmin)

router.route('/login')
    .post(admin, loginAdmin)

router.route('/dashboard')
    .get(admin, getDashboardStats)

export default router;