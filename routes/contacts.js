import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import { allContacts, createContact, deleteContact, oneContact, updateContact } from "../controllers/contacts.js";


// A neat way to use / implement my Auth middleware on all the contacts routes
router.use(auth);

router.get("/", allContacts)
router.post("/", createContact)
router.get("/:id", oneContact)
router.put("/:id", updateContact)
router.delete("/:id", deleteContact)

export default router;