import mongoose from "mongoose";

const ProductQuestionAnswer = new mongoose.Schema(
    {   
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
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

export default mongoose.model("ProductQuestionAnswer", ProductQuestionAnswer);