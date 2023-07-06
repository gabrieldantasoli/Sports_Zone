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
        active_address: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
); 

export default mongoose.model("User", UserSchema);