import mongoose from "mongoose";

const UserWishList = new mongoose.Schema(
    {
        ids : {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
); 

export default mongoose.model("UserWishList", UserWishList);