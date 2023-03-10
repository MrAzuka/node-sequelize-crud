const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Todo = sequelize.define("Todo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 150
        }
    },
    description: {
        type: DataTypes.STRING,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, { timestamps: true });

module.exports = Todo;