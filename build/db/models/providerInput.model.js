"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerInputSchema = exports.ProviderInputModel = void 0;
const sequelize_1 = require("sequelize");
class ProviderInputModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.input, { foreignKey: 'inputId', as: 'input' });
        this.belongsTo(models.provider, { foreignKey: 'providerId', as: 'provider' });
        this.belongsTo(models.measure, { foreignKey: 'measureId', as: 'measure' });
        this.belongsTo(models.brand, { foreignKey: 'brandId', as: 'brand' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'providerInputs',
            modelName: 'providerInput',
            timestamps: true
        };
    }
}
exports.ProviderInputModel = ProviderInputModel;
exports.providerInputSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    inputId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    providerId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    lowerPrice: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    upperPrice: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    currentPrice: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    lastPrice: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    expectedPrice: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    presentation: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    measureId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    brandId: {
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
