"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRecipeSchema = exports.ProductRecipeModel = void 0;
const sequelize_1 = require("sequelize");
class ProductRecipeModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.product, { foreignKey: 'productId' });
        this.belongsTo(models.recipe, { foreignKey: 'recipeId' });
        this.belongsTo(models.modifierElement, { foreignKey: 'modifierElementId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'productRecipes',
            modelName: 'productRecipe',
            timestamps: true
        };
    }
}
exports.ProductRecipeModel = ProductRecipeModel;
exports.productRecipeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    modifierElementId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    productId: {
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
