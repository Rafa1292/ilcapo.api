"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifierElementUpgradeSchema = exports.ModifierElementUpgradeModel = void 0;
const sequelize_1 = require("sequelize");
class ModifierElementUpgradeModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.upgradePrice, { foreignKey: 'upgradeId', as: 'prices' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'modifierElementUpgrades',
            modelName: 'modifierElementUpgrade',
            timestamps: true
        };
    }
}
exports.ModifierElementUpgradeModel = ModifierElementUpgradeModel;
exports.modifierElementUpgradeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    label: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    modifierElementId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    newModifierGroupId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
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
