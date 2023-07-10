import mongoose from "mongoose";

const ProductAssessment = new mongoose.Schema(
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
        assessment : {
            type: nymber,
            required: true,
            min: 1,
            max: 5
        }, 
        nick : {
            type: String,
            required: true,
        }, 
    },
    { timestamps: true }
); 

export default mongoose.model("ProductAssessment", ProductAssessment);