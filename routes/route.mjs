import express from "express";
const router = express.Router();
import createUser  from "../controllers/userController.mjs";

// Define your routes here
router.post("/create", createUser); // Corrected the function reference

export default router;
