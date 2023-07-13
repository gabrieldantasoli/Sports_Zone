import mongoose from "mongoose";

const UserViews = new mongoose.Schema(
    {   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        alimentos : {
            type: Number,
            default: 0
        },
        equipamentos : {
            type: Number,
            default: 0
        },
        vestuario : {
            type: Number,
            default: 0
        },
        bebidas : {
            type: Number,
            default: 0
        },
        suplementos : {
            type: Number,
            default: 0
        },
        eletronicos : {
            type: Number,
            default: 0
        },
        tenis : {
            type: Number,
            default: 0
        },
        acessorios : {
            type: Number,
            default: 0
        },
        ferramentas : {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
); 

export default mongoose.model("UserViews", UserViews);