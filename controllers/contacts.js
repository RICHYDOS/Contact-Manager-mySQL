import asyncHandler from "express-async-handler";
import {Contact} from "../models/contact.js";
import {mysqlPool} from "../index.js";

//@desc: Get all contacts
//@route: GET /api/contacts
//@access: Private
export const allContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).send(contacts);
});

//@desc: Get one contact
//@route: GET /api/contacts/:id
//@access: Private
export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    //if (contact.user_id !== req.user.id){
    //    res.status(403);
    //    throw new Error("User doesn't have permission to update other user contacts");
    //}
    
    res.status(200).send(contact);
});

//@desc: Create new contact
//@route: POST /api/contacts/
//@access: Private
export const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const contact = await Contact.create({
        name, 
        email,
        phone,
        user_id: req.user.id
    });
    res.send(contact);
});

//@desc: Edit a contact
//@route: PUT /api/contacts/:id
//@access: Private
export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if (contact.user_id !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).send(updatedContact);
});

//@desc: Delete a contact
//@route: DELETE /api/contacts/:id
//@access: Private
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if (contact.user_id !== req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to update other user contacts");
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).send(contact);
});