import mysql2 from "mysql2";
import dotenv from "dotenv";
//import { mysqlPool } from "./index.js";

dotenv.config();

// MySQL QUERIES

// USERS QUERIES

export async function getUserByEmail(email) {
    const [rows] = await mysqlPool.query(`
    SELECT * 
    FROM users
    WHERE email = ?`
        , [email]);
    return rows[0];
}

export async function createUser(username, email, password) {
    const [result] = await mysqlPool.query(`
    INSERT INTO users (username, email, password) 
    VALUES (?, ?, ?)
    `, [username, email, password]);
    const id = result.insertId;
    return getUserByEmail(email);
}


// CONTACTS QUERIES

export async function getAllContacts(id) {
    const [rows] = await mysqlPool.query(`
    SELECT id, name, email, phone 
    FROM contacts
    WHERE user_id = ?`
        , [id]);
    return rows;
}

export async function getContact(id) {
    const [rows] = await mysqlPool.query(`
    SELECT * 
    FROM contacts
    WHERE id = ?`
        , [id]);
    return rows[0];
}

export async function createAContact(name, email, phone, user_id) {
    const [result] = await mysqlPool.query(`
    INSERT INTO contacts (name, email, phone, user_id) 
    VALUES (?, ?, ?, ?)
    `, [name, email, phone, user_id]);
    const id = result.insertId;
    return getContact(id);
}

export async function changeContact(name, email, phone, id) {
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

export async function deleteAContact(id) {
    const [result] = await mysqlPool.query(`
    DELETE FROM contacts 
    WHERE id = ?
    `, [id]);

    return result;
}