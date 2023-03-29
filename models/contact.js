import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required:[true, "Please add the contact name"]
    },
    email: {
        type: String,
        required:[true, "Please add the contact Email Address"]
    },
    phone: {
        type: String,
        required:[true, "Please add the contact Phone Number"]
    }
}, {timestamps: true});

export const Contact = mongoose.model("Contact", contactSchema);