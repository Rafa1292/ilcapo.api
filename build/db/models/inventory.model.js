"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySchema = exports.InventoryModel = void 0;
const sequelize_1 = require("sequelize");
class InventoryModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsToMany(models.input, {
            through: models.inventoryInput,
            foreignKey: 'inventoryId',
            as: 'inputs'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'inventories',
            modelName: 'inventory',
            timestamps: true
        };
    }
}
exports.InventoryModel = InventoryModel;
exports.inventorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    initialValue: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    finalValue: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    addedValue: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    initialDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    finalDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    investedPercentage: {
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
