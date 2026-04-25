import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getRecentProducts, getTopProducts, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

router.route('/add-product')
    .post(upload.single('image'), addProduct)

router.route('/:id')
    .patch(upload.single('image'), updateProduct)
    .delete(deleteProduct)

router.route('/products')
    .get(getAllProducts)

router.route('/products/top')
    .get(getTopProducts)

router.route('/products/recent')
    .get(getRecentProducts)


export default router;