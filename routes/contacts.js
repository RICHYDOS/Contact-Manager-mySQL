import express from "express";
const router = express.Router();
import {allContacts, getContact, createContact, updateContact, deleteContact} from "../controllers/contacts.js";


// A neat way to use / implement my Auth middleware on all the contacts routes
//router.use(auth);

router.get("/", allContacts)

router.get("/:id", getContact)

router.post("/", createContact)

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)

export default router;