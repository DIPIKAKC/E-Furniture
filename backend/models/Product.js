import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    tags: [{
        type: String,
    }],

    sizes: [{
        type: String,
    }],

    colors: [{
        type: String,
    }],

    //array of images
    images: [{
        type: String, // URL of product image
    }],

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    //average rating of all
    rating: {
        type: Number,
        default: 0
    },

    //number of reviews
    numReviews: {
        type: Number,
        default: 0
    },

    isHero: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;
