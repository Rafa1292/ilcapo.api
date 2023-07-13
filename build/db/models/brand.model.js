"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandSchema = exports.BrandModel = void 0;
const sequelize_1 = require("sequelize");
class BrandModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.providerInput, { foreignKey: 'brandId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'brands',
            modelName: 'brand',
            timestamps: true
        };
    }
}
exports.BrandModel = BrandModel;
exports.brandSchema = {
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
