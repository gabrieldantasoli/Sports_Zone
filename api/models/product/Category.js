import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        img : {
            type: String,
            required: true,
        },
        link : {
            type: String,
            required: true
        }
    },
    { timestamps: true }
); 

export default mongoose.model("Category", CategorySchema);