import express from "express";
const router = express.Router();
import {registerUser} from "../controllers/users.js";
router.post("/register", registerUser);

export default router;