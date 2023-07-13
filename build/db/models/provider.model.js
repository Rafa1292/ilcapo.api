"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerSchema = exports.ProviderModel = void 0;
const sequelize_1 = require("sequelize");
class ProviderModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.providerInput, { foreignKey: 'providerId', as: 'providerInputs' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'providers',
            modelName: 'provider',
            timestamps: true
        };
    }
}
exports.ProviderModel = ProviderModel;
exports.providerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    phone: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    fixedExpense: {
        type: sequelize_1.DataTypes.BOOLEAN
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
