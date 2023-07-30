import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/user/auth.js";
import userRoute from "./routes/user/users.js";
import userAdress from "./routes/user/address.js";
import routerViews from "./routes/user/views.js";
import routerCartProduct from "./routes/user/cartProduct.js";
import routerShopping from "./routes/user/shoppings.js"
import routerFavorites from "./routes/user/favorites.js"

import routerCategory from "./routes/product/category.js";
import routerProduct from "./routes/product/product.js";
import routerQuestion from "./routes/product/question.js";
import routerAnswer from "./routes/product/answer.js";
import routerAssessment from "./routes/product/assessment.js";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to mongo DB!!!");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () =>{
    console.log("Mongo DB disconnected!!!");
});


// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/address", userAdress);
app.use("/category", routerCategory);
app.use("/product", routerProduct);
app.use("/question", routerQuestion);
app.use("/answer", routerAnswer);
app.use("/assessment", routerAssessment);
app.use("/views", routerViews);
app.use("/cart", routerCartProduct);
app.use("/shopping", routerShopping);
app.use("/favorites", routerFavorites);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});




/**
 *                       BACK_END
 *                   ____     ______________            *                 
 *     *            /___/|   /_____________/|                             
 *                  |   ||   |    _________|/    *                     
 *       *          |   ||   |    | |______                            
 *   *              |   ||   |    |/______/|                                          
 *       *   ___    |   ||   |________    ||         *            
 *          /  /|___|   ||    ________|   ||
 *    *    |  |_/___|   ||   /________|   ||
 *          \__________//    |____________|/    *
 * 
 * 
 *  + Developed by : GabrielDantasOli
 *  + GITHUB       : https://github.com/gabrieldantasoli
 *  + Contact      : gabriel.dantas.oliveira@ccc.ufcg.edu.br
 *  + JAVASCRIPT FOR ALL LIFE!
 * 
 * npm install -g @vercel/ncc
 * ncc build index.js -o build
 **/ 