"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemPriceSchema = exports.ItemPriceModel = void 0;
const sequelize_1 = require("sequelize");
class ItemPriceModel extends sequelize_1.Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "itemPrices",
            modelName: "itemPrice",
            timestamps: true,
        };
    }
}
exports.ItemPriceModel = ItemPriceModel;
exports.itemPriceSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    itemId: {
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
