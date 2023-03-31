import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {mysqlPool} from "../index.js";
dotenv.config();

// MySQL QUERIES

async function getUserById(id) {
    const [rows] = await mysqlPool.query(`
    SELECT * 
    FROM users
    WHERE id = ?`
    , [id]);
    return rows[0];
}

async function getUserByEmail(email) {
    const [rows] = await mysqlPool.query(`
    SELECT * 
    FROM users
    WHERE email = ?`
    , [email]);
    return rows[0];
}

async function createUser(username, email, password) {
    const [result] = await mysqlPool.query(`
    INSERT INTO users (username, email, password) 
    VALUES (?, ?, ?)
    `, [username, email, password]);
    const id = result.insertId;
    return getUserById(id);
}

// CONTROLLERS

//@desc: Register a User
//@route: POST /api/users/register
//@access: Public
export const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const user = await getUserByEmail(email);
    if (user) {
        res.status(400);
        throw new Error("User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(username, email, hashedPassword);

    if (newUser){
        const result = {user_id: newUser.id, user_email: newUser.email};
        res.status(201).send(result);
    }
    else{
        res.status(400);
        throw new Error("Invalid Data");
    }
    
});

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    const user = await getUserByEmail(email);
 
    // Compare client password with db password
    if (user && (bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            //Payload
            {
                user: {
                username: user.username,
                email: user.email,
                id: user.id
                },
            },
            //Access Token Secret Key
            process.env.ACCESSTOKENSECRET,
            // Options like token expiry
            {expiresIn: "15m"}
        );

        res.status(200).send({access_token: accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or Password are invalid");
    }

});
