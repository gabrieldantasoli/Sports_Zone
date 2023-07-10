import mongoose from "mongoose";

const UserFavoritesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ids: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("UserFavorites", UserFavoritesSchema);