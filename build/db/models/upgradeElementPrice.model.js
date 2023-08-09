"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradeElementPriceSchema = exports.UpgradeElementPriceModel = void 0;
const sequelize_1 = require("sequelize");
class UpgradeElementPriceModel extends sequelize_1.Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "upgradePrices",
            modelName: "upgradePrice",
            timestamps: true,
        };
    }
}
exports.UpgradeElementPriceModel = UpgradeElementPriceModel;
exports.upgradeElementPriceSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    upgradeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    menuId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    updatedBy: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
};
