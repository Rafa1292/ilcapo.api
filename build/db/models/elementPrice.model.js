"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementPriceSchema = exports.ElementPriceModel = void 0;
const sequelize_1 = require("sequelize");
class ElementPriceModel extends sequelize_1.Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "elementPrices",
            modelName: "elementPrice",
            timestamps: true,
        };
    }
}
exports.ElementPriceModel = ElementPriceModel;
exports.elementPriceSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    elementId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    menuId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
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
