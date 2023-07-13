"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientSchema = exports.IngredientModel = void 0;
const sequelize_1 = require("sequelize");
class IngredientModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.preparationStep, { foreignKey: 'ingredientId', as: 'preparationSteps' });
        this.belongsTo(models.measure, { foreignKey: 'measureId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'ingredients',
            modelName: 'ingredient',
            timestamps: true
        };
    }
}
exports.IngredientModel = IngredientModel;
exports.ingredientSchema = {
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
    measureId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    ingredientCategoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    presentation: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    price: {
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
