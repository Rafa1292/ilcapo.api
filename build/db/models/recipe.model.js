"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeSchema = exports.RecipeModel = void 0;
const sequelize_1 = require("sequelize");
class RecipeModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.recipeStep, { foreignKey: 'recipeId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'recipes',
            modelName: 'recipe',
            timestamps: true
        };
    }
}
exports.RecipeModel = RecipeModel;
exports.recipeSchema = {
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
    cost: {
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
