import mongoose from "mongoose";

const UserAddress = new mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        country : {
            type: String,
            required: true,
        },
        state : {
            type: String,
            required: true,
        },
        city : {
            type: String,
            required: true,
        }, 
        neighborhood : {
            type: String,
            required: true,
        }, 
        street : {
            type: String,
            required: true,
        }, 
        complement : {
            type: String,
            required: true,
        }, 
        number : {
            type: String,
            required: true,
        }, 
        reference : {
            type: String,
            required: true,
        },
        active : {
            type: Boolean,
            required: false,
        }
    },
    { timestamps: true }
); 

export default mongoose.model("UserAddress", UserAddress);