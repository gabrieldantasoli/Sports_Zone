import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {  
        name : {
            type: String,
            required: true,
        },
        category : {
            type: String,
            required: true,
        },
        value : {
            type: Number,
            required: true,
        },
        discount : {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }, 
        prevision: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
            required: true
        },
        name_model: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: true,
        },
        delivery: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        img_preview: {
            type: String,
            required: true
        },
        img_gallery: {
            type: [String],
            required: true
        },
        sold : {
            type: Number,
            required: true,
            default: 0
        },
    },
    { timestamps: true }
); 

export default mongoose.model("Product", ProductSchema);