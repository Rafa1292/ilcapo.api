"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleItemCategorySchema = exports.SaleItemCategoryModel = void 0;
const sequelize_1 = require("sequelize");
class SaleItemCategoryModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.saleItem, { foreignKey: 'saleItemCategoryId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'saleItemCategories',
            modelName: 'saleItemCategory',
            timestamps: true
        };
    }
}
exports.SaleItemCategoryModel = SaleItemCategoryModel;
exports.saleItemCategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
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
