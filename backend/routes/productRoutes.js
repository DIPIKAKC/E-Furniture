import express from 'express'
import { addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.route('/add-product')
    .post(upload.single('image'), addProduct)

router.route('/:id')
    .patch(upload.single('image'), updateProduct)
    .delete(deleteProduct)

export default router;