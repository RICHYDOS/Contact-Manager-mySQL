import express from "express";
const router = express.Router();
import {registerUser, loginUser} from "../controllers/users.js";
import { tryCatch } from "../utils/trycatch.js";

router.post("/register", tryCatch(registerUser));
router.post("/login", tryCatch(loginUser));

export default router;