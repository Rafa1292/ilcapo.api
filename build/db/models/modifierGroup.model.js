"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierGroupSchema = exports.ModifierGroupModel = void 0;
const sequelize_1 = require("sequelize");
class ModifierGroupModel extends sequelize_1.Model {
    static associate(models) {
        ModifierGroupModel.hasMany(models.modifierElement, {
            foreignKey: 'modifierGroupId',
            as: 'elements'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'modifierGroups',
            modelName: 'modifierGroup',
            timestamps: true
        };
    }
}
exports.ModifierGroupModel = ModifierGroupModel;
exports.modifierGroupSchema = {
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
    minSelectable: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    maxSelectable: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    isRequired: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    label: {
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
