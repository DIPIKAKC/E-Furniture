import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getHeroProduct, getNewArrival, getProductById, getRecentProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/cloudinary.js';
import { admin, protect } from '../middleware/checkUser.js';

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(upload.array('images', 5), addProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/recent')
    .get(getRecentProducts)

router.route('/newarrival')
    .get(getNewArrival)

router.route('/hero')
    .get(getHeroProduct)


router.route('/:id')
    .get(getProductById)
    .patch(protect, admin, upload.array('images', 5), updateProduct)
    .delete(protect, admin, deleteProduct)


export default router;