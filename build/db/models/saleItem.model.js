"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleItemSchema = exports.SaleItemModel = void 0;
const sequelize_1 = require("sequelize");
class SaleItemModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.itemPrice, { foreignKey: 'itemId', as: 'prices' });
        this.hasMany(models.saleItemProduct, { foreignKey: 'saleItemId', as: 'saleItemProducts' });
        this.belongsTo(models.saleItemCategory, { foreignKey: 'saleItemCategoryId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'saleItems',
            modelName: 'saleItem',
            timestamps: true
        };
    }
}
exports.SaleItemModel = SaleItemModel;
exports.saleItemSchema = {
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
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    saleItemCategoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    pictureUrl: {
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
