import {sequelize} from "../index.js";

const Contact = sequelize.define("contacts", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
})

await Contact.sync();
console.log("It actually worked");
