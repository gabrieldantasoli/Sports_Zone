import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {   
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name : {
            type: String,
            required: true,
        },
        preco : {
            type: number,
            required: true,
        },
        discount : {
            type: number,
            required: true,
            min: 0,
            max: 100
        }, 
        prevision: {
            type: number,
            required: true,
        },
        marca: {
            type: String,
            required: true
        },
        name_model: {
            type: String,
            required: true
        },
        description: {
            type: Boolean,
            default: true,
        },
        delivery: {
            type: number,
            required: true
        },
        stock: {
            type: number,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        img_gallery: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
); 

export default mongoose.model("Product", ProductSchema);