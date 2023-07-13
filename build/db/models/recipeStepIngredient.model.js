"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeStepIngredientSchema = exports.RecipeStepIngredientModel = void 0;
const sequelize_1 = require("sequelize");
class RecipeStepIngredientModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.ingredient, {
            foreignKey: 'ingredientId',
            as: 'ingredient'
        });
        this.belongsTo(models.recipeStep, {
            foreignKey: 'recipeStepId',
            as: 'recipeStep'
        });
        this.belongsTo(models.measure, {
            foreignKey: 'measureId',
            as: 'measure'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'recipeStepIngredients',
            modelName: 'recipeStepIngredient',
            timestamps: true
        };
    }
}
exports.RecipeStepIngredientModel = RecipeStepIngredientModel;
exports.recipeStepIngredientSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    recipeStepId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    ingredientId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    measureId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    extra: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    isOptional: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
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
