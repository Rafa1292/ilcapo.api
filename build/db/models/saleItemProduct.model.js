"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleItemProductSchema = exports.SaleItemProductModel = void 0;
const sequelize_1 = require("sequelize");
class SaleItemProductModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.product, {
            foreignKey: 'productId',
            as: 'product'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'saleItemProducts',
            modelName: 'saleItemProduct',
            timestamps: true
        };
    }
}
exports.SaleItemProductModel = SaleItemProductModel;
exports.saleItemProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    saleItemId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    productId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    discount: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
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
