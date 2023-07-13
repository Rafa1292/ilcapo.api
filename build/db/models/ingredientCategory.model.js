"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientCategorySchema = exports.IngredientCategoryModel = void 0;
const sequelize_1 = require("sequelize");
class IngredientCategoryModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.ingredient, { foreignKey: 'ingredientCategoryId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'ingredientCategories',
            modelName: 'ingredientCategory',
            timestamps: true
        };
    }
}
exports.IngredientCategoryModel = IngredientCategoryModel;
exports.ingredientCategorySchema = {
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
