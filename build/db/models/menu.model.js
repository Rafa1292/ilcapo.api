"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSchema = exports.MenuModel = void 0;
const sequelize_1 = require("sequelize");
class MenuModel extends sequelize_1.Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "menus",
            modelName: "menu",
            timestamps: true,
        };
    }
}
exports.MenuModel = MenuModel;
exports.menuSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    comissionPercentage: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    updatedBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
};
