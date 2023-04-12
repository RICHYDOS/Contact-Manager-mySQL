import asyncHandler from "express-async-handler";
import { getAllContacts, getContact, createAContact, changeContact, deleteAContact } from "../mysql.js";
import { Contact } from "../models/contact.js";

// Controllers

//@desc: Create new contact
//@route: POST /api/contacts/
//@access: Private

//@desc: Get all contacts
//@route: GET /api/contacts
//@access: Private

//@desc: Get one contact
//@route: GET /api/contacts/:id
//@access: Private

//@desc: Edit a contact
//@route: PUT /api/contacts/:id
//@access: Private

//@desc: Delete a contact
//@route: DELETE /api/contacts/:id
//@access: Private


// USING RAW SQL QUERIES

// export const createContact = async (req, res) => {
//     const { name, email, phone } = req.body;
//     if (!name || !email || !phone) {
//         res.status(400);
//         throw new Error("All Fields are Mandatory");
//     }
//     const contact = await createAContact(name, email, phone, req.user.id);

//     if (contact) {
//         const result = { id: contact.id, name: contact.name, email: contact.email, phone: contact.phone }
//         res.status(201).send(result);
//     }
//     else {
//         res.status(400);
//         throw new Error("Invalid Data");
//     }
// };


// export const allContacts = async (req, res) => {
//     const contacts = await getAllContacts(req.user.id);
//     if (!contacts[0]) {
//         res.status(404);
//         throw new Error("Contact not Found");
//     }
//     res.status(200).send(contacts);
// };


// export const oneContact = async (req, res) => {
//     const contact = await getContact(req.params.id);

//     if (!contact) {
//         res.status(404);
//         throw new Error("Contact not Found");
//     }

//     if (contact.user_id !== req.user.id) {
//         res.status(403);
//         throw new Error("User doesn't have permission to view other user contacts");
//     }

//     res.status(200).send(contact);
// };


// export const updateContact = async (req, res) => {
//     let {name, email, phone} = req.body;
//     if (!name && !email && !phone) {
//         res.status(400);
//         throw new Error("Empty Body is not Allowed");
//     }

//     const contact = await getContact(req.params.id);

//     if (!contact) {
//         res.status(404);
//         throw new Error("Contact not Found");
//     }

//     if (contact.user_id !== req.user.id) {
//         res.status(403);
//         throw new Error("User doesn't have permission to update other user contacts");
//     }

//     name = req.body.name || contact.name;
//     email = req.body.email || contact.email;
//     phone = req.body.phone || contact.phone;

//     const updatedContact = await changeContact(name, email, phone, req.params.id);

//     res.status(200).send(updatedContact);
// };

// export const deleteContact = async (req, res) => {
//     const contact = await getContact(req.params.id);

//     if (!contact) {
//         res.status(404);
//         throw new Error("Contact not Found");
//     }

//     if (contact.user_id !== req.user.id) {
//         res.status(403);
//         throw new Error("User doesn't have permission to update other user contacts");
//     }

//     const final = await deleteAContact(req.params.id);
//     if (final) {
//         res.status(200).send("Item has been deleted");
//     }

// };


// USING SEQUELIZE

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const contact = await Contact.create({ name, user_id: req.user.id, email, phone });

    if (contact) {
        const result = { id: contact.id, name: contact.name, email: contact.email, phone: contact.phone }
        res.status(201).send(result);
    }
    else {
        res.status(400);
        throw new Error("Invalid Data");
    }
};


export const allContacts = async (req, res) => {
    const contacts = await Contact.findAll({ where: { user_id: req.user.id } });
    if (!contacts[0]) {
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).send(contacts);
};


export const oneContact = async (req, res) => {
    let contact = await Contact.findAll({ where: { id: req.params.id } });
    contact.forEach(element => {
        contact = element.toJSON();
    });
    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorised OR No Contact");
    }

    const result = {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
    }
    res.status(200).send(result);
};


export const updateContact = async (req, res) => {
    let {name, email, phone} = req.body;
    if (!name && !email && !phone) {
        res.status(400);
        throw new Error("Empty Body is not Allowed");
    }

    let contact = await Contact.findAll({ where: { id: req.params.id } });
    contact.forEach(element => {
        contact = element.toJSON();
    });

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorised OR No Contact");
    }

    name = req.body.name || contact.name;
    email = req.body.email || contact.email;
    phone = req.body.phone || contact.phone;

    await Contact.update({ name, email, phone }, { where: { id: req.params.id } });

    res.status(200).send({ message: "Contact Updated" });
};


export const deleteContact = async (req, res) => {
    let contact = await Contact.findAll({ where: { id: req.params.id } });
    contact.forEach(element => {
        contact = element.toJSON();
    });

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorised OR No Contact");
    }

    await Contact.destroy({ where: { id: req.params.id } });

    res.status(200).send({ message: "Contact Deleted" });
};