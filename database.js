import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const result = await pool.query("SELECT * FROM contacts");
const rows = result[0];
console.log(rows);


async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM contact");
    return rows
}

async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows
}

async function createUser(username, email, password) {
    const [result] = await pool.query(`
    INSERT INTO users (username, email, password) 
    VALUES (?, ?, ?)
    `, [username, email, password]);
    const id = result.insertId;
    return getUserById(id);
}

async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM contact
    WHERE id = ?`
        , [id]);
    return rows[0];
}

async function getUserById(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE id = ?`
        , [id]);
    return rows[0];
}
async function getUserByEmail(email) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM users
    WHERE email = ?`
        , [email]);
    return rows[0];
}

