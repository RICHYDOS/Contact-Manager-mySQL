// import Sequelize from "sequelize";

//const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, { dialect: "mysql" });

// export const User = sequelize.define("users", {
//     id: {
//         type: Sequelize.DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.DataTypes.CHAR(60),
//         allowNull: false
//     }
// })

// await User.sync();
// console.log("User Table, Check...");