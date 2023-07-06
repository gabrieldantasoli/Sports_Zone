import mongoose from "mongoose";

const UserAddress = new mongoose.Schema(
    {
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
    },
    { timestamps: true }
); 

export default mongoose.model("UserAddress", UserAddress);