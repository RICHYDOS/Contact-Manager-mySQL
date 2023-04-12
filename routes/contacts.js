import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import { allContacts, createContact, deleteContact, oneContact, updateContact } from "../controllers/contacts.js";
import { tryCatch } from "../utils/trycatch.js";
tryCatch


// A neat way to use / implement my Auth middleware on all the contacts routes
router.use(auth);

router.get("/", tryCatch(allContacts))
router.post("/", tryCatch(createContact))
router.get("/:id", tryCatch(oneContact))
router.put("/:id", tryCatch(updateContact))
router.delete("/:id", tryCatch(deleteContact))

export default router;