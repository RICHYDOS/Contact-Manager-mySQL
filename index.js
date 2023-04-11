import express from "express";
import dotenv from "dotenv";
import mysql2 from "mysql2";
import Sequelize from "sequelize";
import users from "./routes/users.js";
import contacts from "./routes/contacts.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//export const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, { dialect: "mysql" });

export const mysqlPool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


app.use(express.json());
app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
