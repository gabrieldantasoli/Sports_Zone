import mongoose from "mongoose";

const ProductQuestion = new mongoose.Schema(
    {   
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        message : {
            type: String,
            required: true,
        }, 
        nick : {
            type: String,
            required: true,
        }, 
    },
    { timestamps: true }
); 

export default mongoose.model("ProductQuestion", ProductQuestion);