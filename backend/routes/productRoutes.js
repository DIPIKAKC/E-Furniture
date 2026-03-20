import express from 'express'
import { addProduct, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.route('/add-product')
    .post(upload.single('image'), addProduct)

router.route('/:id')
    .patch(upload.single('image'), updateProduct)

export default router;