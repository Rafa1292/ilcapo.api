"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierElementSchema = exports.ModifierElementModel = void 0;
const sequelize_1 = require("sequelize");
class ModifierElementModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.elementPrice, { foreignKey: 'elementId', as: 'prices' });
        this.belongsTo(models.modifierGroup, {
            foreignKey: 'modifierGroupId',
            as: 'modifierGroup'
        });
        this.hasOne(models.productReference, {
            foreignKey: 'modifierElementId',
            as: 'productReference'
        });
        this.hasOne(models.modifierElementUpgrade, {
            foreignKey: 'modifierElementId',
            as: 'modifierUpgrade'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'modifierElements',
            modelName: 'modifierElement',
            timestamps: true
        };
    }
}
exports.ModifierElementModel = ModifierElementModel;
exports.modifierElementSchema = {
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
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    combinable: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    numberOfParts: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    combinableModifierGroupId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    modifierGroupId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    defaultRecipeId: {
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
