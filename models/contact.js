// import Sequelize from "sequelize";
// import {User} from "./user.js";
// const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, { dialect: "mysql" });

// export const Contact = sequelize.define("contacts", {
//     id: {
//         type: Sequelize.DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     user_id: {
//         type: Sequelize.DataTypes.INTEGER,
//         references: {
//             model: User,
//             key: "id"
//         },
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//     },
//     phone: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//     }
// })

// await Contact.sync();
// console.log("Contact Table, Check...");
