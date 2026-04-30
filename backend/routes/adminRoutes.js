import express from 'express'
import { getDashboardStats, loginAdmin, registerAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.route('/register')
    .post(registerAdmin)

router.route('/login')
    .post(loginAdmin)

router.route('/dashboard')
    .get(getDashboardStats)

export default router;