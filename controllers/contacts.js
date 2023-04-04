import asyncHandler from "express-async-handler";
import { mysqlPool } from "../index.js";

//MYSQL QUERIES

async function getAllContacts(id) {
    const [rows] = await mysqlPool.query(`
    SELECT id, name, email, phone 
    FROM contacts
    WHERE user_id = ?`
        , [id]);
    return rows;
}

async function getContact(id) {
    const [rows] = await mysqlPool.query(`
    SELECT * 
    FROM contacts
    WHERE id = ?`
        , [id]);
    return rows[0];
}

async function createAContact(name, email, phone, user_id) {
    const [result] = await mysqlPool.query(`
    INSERT INTO contacts (name, email, phone, user_id) 
    VALUES (?, ?, ?, ?)
    `, [name, email, phone, user_id]);
    const id = result.insertId;
    return getContact(id);
}

async function changeContact(name, email, phone, id) {
    const [result] = await mysqlPool.query(`
    UPDATE contacts
    SET
        name = ?, 
        email = ?, 
        phone = ?
    WHERE id = ?
    `, [name, email, phone, id]);
    return getContact(id);
}

async function deleteAContact(id) {
    const [result] = await mysqlPool.query(`
    DELETE FROM contacts 
    WHERE id = ?
    `, [id]);

    return result;
}

// Controllers

//@desc: Get all contacts
//@route: GET /api/contacts
//@access: Private
export const allContacts = asyncHandler(async (req, res) => {
    const contacts = await getAllContacts(req.user.id);
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).send(contacts);
});

//@desc: Create new contact
//@route: POST /api/contacts/
//@access: Private
export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const contact = await createAContact(name, email, phone, req.user.id);

    if (contact) {
        const result = { id: contact.id, name: contact.name, email: contact.email, phone: contact.phone }
        res.status(201).send(result);
    }
    else {
        res.status(400);
        throw new Error("Invalid Data");
    }
});

//@desc: Get one contact
//@route: GET /api/contacts/:id
//@access: Private
export const oneContact = asyncHandler(async (req, res) => {
    const contact = await getContact(req.params.id);

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to view other user contacts");
    }

    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }

    res.status(200).send(contact);
});

//@desc: Edit a contact
//@route: PUT /api/contacts/:id
//@access: Private
export const updateContact = asyncHandler(async (req, res) => {
    const contact = await getContact(req.params.id);

    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user contacts");
    }

    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }

    const name = req.body.name || contact.name;
    const email = req.body.email || contact.email;
    const phone = req.body.phone || contact.phone;

    const updatedContact = await changeContact(name, email, phone, req.params.id);

    res.status(200).send(updatedContact);
});

//@desc: Delete a contact
//@route: DELETE /api/contacts/:id
//@access: Private
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await getContact(req.params.id);
    if (contact.user_id !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user contacts");
    }

    if (!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    }

    const final = await deleteAContact(req.params.id);
    if (final) {
        res.status(200).send("Item has been deleted");
    }

});