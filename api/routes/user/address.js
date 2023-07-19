import express from "express";
import { verifyUser } from "../../utils/verifyToken.js";
import { createUSerAddress, updateUserAddress, deleteUserAddress, getUserAddresses } from "../../controllers/address.js";

const router = express.Router();

// UPDATE ADDRESS
router.put("/:id", verifyUser, updateUserAddress); 

// CREATE ADDRESS
router.put("/", verifyUser, createUSerAddress);

// GET ALL ADDRESSES
router.get("/:id", verifyUser, getUserAddresses);

export default router;