import mongoose from "mongoose";

const ShoppingProductSchema = new mongoose.Schema(
    {  
        shopping: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shopping",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        qtd: {
            type: Number,
            required: true
        },
        unityValue: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
); 

export default mongoose.model("ShoppingProduct", ShoppingProductSchema);