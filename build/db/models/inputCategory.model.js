"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCategorySchema = exports.InputCategoryModel = void 0;
const sequelize_1 = require("sequelize");
class InputCategoryModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.input, { foreignKey: 'inputCategoryId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'inputCategories',
            modelName: 'inputCategory',
            timestamps: true
        };
    }
}
exports.InputCategoryModel = InputCategoryModel;
exports.inputCategorySchema = {
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
