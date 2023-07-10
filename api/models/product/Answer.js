import mongoose from "mongoose";

const ProductAssessmentAnswer = new mongoose.Schema(
    {   
        assessment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assessment",
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

export default mongoose.model("ProductAssessmentAnswer", ProductAssessmentAnswer);