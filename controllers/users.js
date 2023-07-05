import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

// USING RAW SQL QUERIES
// import { getUserByEmail, createUser } from "../mysql.js";
// CONTROLLERS

// export const registerUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     if (!username || !email || !password) {
//         res.status(400);
//         throw new Error("All Fields are Mandatory");
//     }
//     const user = await getUserByEmail(email);
//     if (user) {
//         res.status(400);
//         throw new Error("User Already Exists");
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await createUser(username, email, hashedPassword);

//     if (newUser) {
//         const result = { user_id: newUser.id, user_email: newUser.email };
//         res.status(201).send(result);
//     }
//     else {
//         res.status(400);
//         throw new Error("Invalid Data");
//     }

// };

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400);
//         throw new Error("All Fields are Mandatory");
//     }

//     const user = await getUserByEmail(email);

//     // Compare client password with db password
//     if (user && (bcrypt.compare(password, user.password))) {
//         const accessToken = jwt.sign(
//             //Payload
//             {
//                 user: {
//                     username: user.username,
//                     email: user.email,
//                     id: user.id
//                 },
//             },
//             //Access Token Secret Key
//             process.env.ACCESSTOKENSECRET,
//             // Options like token expiry
//             { expiresIn: "4h" }
//         );

//         res.status(200).send({ access_token: accessToken });
//     }
//     else {
//         res.status(401);
//         throw new Error("Email or Password are invalid");
//     }

// };


// USING SEQUELIZE

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    if (user) {
        const result = { user_id: user.id, user_email: user.email };
        res.status(201).send(result);
    }
    else {
        res.status(400);
        throw new Error("Invalid Data");
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    let user = await User.findAll({ where: { email } });

    // Compare client password with db password
    if (user[0] && (bcrypt.compare(password, user[0].dataValues.password))) {
        user = user[0].dataValues;
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
            { expiresIn: "4h" }
        );
        res.status(200).send({ access_token: accessToken });
    }
    else {
        res.status(401);
        throw new Error("Email or Password are invalid");
    }
};

export const getUser = async (req, res) => {

    let user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
        res.status(404);
        throw new Error("User Does Not Exist");
    }
    else if (user.id !== req.user.id){
        res.status(403);
        throw new Error("User Does Not have access to view this profile");
    }
    else{
        res.status(200).send(user);
    }
};
