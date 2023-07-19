import express from "express";
import { verifyUser } from "../../utils/verifyToken.js";
import { createFavoriteProduct, deleteFavoriteProduct, getFavoriteProducts } from "../../controllers/favorites.js";

const router = express.Router();

// CREATE a Favorite Product
router.put("/", verifyUser, createFavoriteProduct);

// DELTE a Favorite Product
router.delete("/:id/:pi", verifyUser, deleteFavoriteProduct);

// GET ALL Favorite Products By User 
router.get("/:id", verifyUser, getFavoriteProducts);

export default router;