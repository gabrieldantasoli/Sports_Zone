import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true,
        }, 
        pass: {
            type: Boolean,
            required: false,
        },
        people_pass: {
            type: Number,
            required: false,
            min: 0
        },
        active_address: {
            type: String,
            required: false
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
); 

export default mongoose.model("User", UserSchema);