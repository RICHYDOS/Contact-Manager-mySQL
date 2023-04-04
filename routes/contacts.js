import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import { allContacts, createContact, oneContact, updateContact } from "../controllers/contacts.js";


// A neat way to use / implement my Auth middleware on all the contacts routes
//router.use(auth);

router.get("/", auth, allContacts)
router.post("/", auth, createContact)
router.get("/:id", auth, oneContact)
router.put("/:id", auth, updateContact)

export default router;