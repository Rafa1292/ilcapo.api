"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeStepSchema = exports.RecipeStepModel = void 0;
const sequelize_1 = require("sequelize");
class RecipeStepModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.recipeStepIngredient, {
            foreignKey: 'recipeStepId',
            as: 'recipeStepIngredients'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'recipeSteps',
            modelName: 'recipeStep',
            timestamps: true
        };
    }
}
exports.RecipeStepModel = RecipeStepModel;
exports.recipeStepSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    cost: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    stepNumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    minutesOfPreparation: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    recipeId: {
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
