"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryInputSchema = exports.InventoryInputModel = void 0;
const sequelize_1 = require("sequelize");
class InventoryInputModel extends sequelize_1.Model {
    // static associate (models: any): void {
    // }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'inventoryInputs',
            modelName: 'inventoryInput',
            timestamps: true
        };
    }
}
exports.InventoryInputModel = InventoryInputModel;
exports.inventoryInputSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    inventoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    inputId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    initialQuantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    addedQuantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    finalQuantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    measureId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    createdBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    updatedBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    }
};
