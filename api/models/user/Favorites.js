import mongoose from "mongoose";

const UserFavoritesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

// Criar um índice único para o campo user e product_id
UserFavoritesSchema.index({ user: 1, product_id: 1 }, { unique: true });

export default mongoose.model("UserFavorites", UserFavoritesSchema);
