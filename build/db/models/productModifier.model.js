"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModifierSchema = exports.ProductModifierModel = void 0;
const sequelize_1 = require("sequelize");
class ProductModifierModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.modifierGroup, {
            foreignKey: 'modifierGroupId',
            as: 'modifierGroup'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'productModifiers',
            modelName: 'productModifier',
            timestamps: true
        };
    }
}
exports.ProductModifierModel = ProductModifierModel;
exports.productModifierSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    productId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    modifierGroupId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    // order: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
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
