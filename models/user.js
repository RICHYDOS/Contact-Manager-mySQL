import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter the Username"]
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email Address"],
        unique: [true, "Email Address Already Taken"]
    },
    password: {
        type: String,
        required: [true, "Please Enter the Password"]
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);