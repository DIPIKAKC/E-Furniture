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
        type: String,
        required: true,
    },

    tags: [{
        type: String,
    }],

    sizes: [{
        type: String,
        enum: ["S", "M", "L", "XL"],
    }],

    colors: [{
        type: String,
    }],

    image: {
        type: String, // URL of product image
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    //indiv user review
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: String,
            rating: Number,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    //average rating of all
    rating: {
        type: Number,
        default: 0
    },

    //number or reviews
    numReviews: {
        type: Number,
        default: 0
    },
    

}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;
