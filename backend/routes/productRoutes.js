import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getNewArrival, getProductById, getRecentProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(upload.single('image'), addProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/recent')
    .get(getRecentProducts)

router.route('/newarrival')
    .get(getNewArrival)

router.route('/:id')
    .get(getProductById)
    .patch(upload.single('image'), updateProduct)
    .delete(deleteProduct)


export default router;