import mongoose from "mongoose";

const UserShoppings = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ids : {
            type: [String],
            required: true,
        },
        values : {
            type: [number],
            required: true,
        },
        forecast : {
            type: Date,
            required: true,
        },
        status : {
            type: String,
            required: false,
        },
        total_value : {
            type: number,
            required: true,
        },
    },
    { timestamps: true }
); 

export default mongoose.model("UserAddress", UserShoppings);