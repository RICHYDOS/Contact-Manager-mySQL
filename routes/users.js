import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import {registerUser, loginUser, getUser} from "../controllers/users.js";
import { tryCatch } from "../utils/trycatch.js";

router.post("/register", tryCatch(registerUser));
router.post("/login", tryCatch(loginUser));
// Delete the getUser route here and where it is imported at the top
// if you switch to RAW SQL queries
router.get("/:id", auth, tryCatch(getUser));

export default router;