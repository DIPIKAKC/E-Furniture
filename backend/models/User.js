import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    companyName: String,

    phone: String,

    address: [{
        street: String,
        city: String,
        province: String,
        zipCode: String,
        country: String
    }]


}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;