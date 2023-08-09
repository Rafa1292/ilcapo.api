"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
class ProductModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.productModifier, { foreignKey: 'productId', as: 'productModifiers' });
        this.hasMany(models.saleItemProduct, { foreignKey: 'productId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'products',
            modelName: 'product',
            timestamps: true
        };
    }
}
exports.ProductModel = ProductModel;
exports.productSchema = {
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
    pictureUrl: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    allowsModify: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
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
