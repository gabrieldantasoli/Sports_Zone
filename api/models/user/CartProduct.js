import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema(
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
        qtd: {
            type: Number,
            required: true,
            min: 1
        },
    },
    { timestamps: true }
);

export default mongoose.model("CartProduct", CartProductSchema);