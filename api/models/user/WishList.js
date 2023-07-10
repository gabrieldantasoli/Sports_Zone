import mongoose from "mongoose";

const UserWishList = new mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ids : {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
); 

export default mongoose.model("UserWishList", UserWishList);