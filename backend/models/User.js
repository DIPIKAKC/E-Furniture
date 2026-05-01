import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    // ^ => Start of password
    // (?=.*[A-Za-z]) => Must contain at least one letter
    // (?=.*\d) => Must contain at least one number
    // [A-Za-z\d]{6,} => Only letters and numbers, minimum 6 characters
    // $ => End of password
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
            "Password must contain at least one letter, one number, and be at least 6 characters long"
        ]
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

    address: String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }


}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;