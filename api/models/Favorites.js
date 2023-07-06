import mongoose from "mongoose";

const UserFavorites = new mongoose.Schema(
    {
        ids : {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
); 

export default mongoose.model("UserFavorites", UserFavorites);