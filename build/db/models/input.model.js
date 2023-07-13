"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputSchema = exports.InputModel = void 0;
const sequelize_1 = require("sequelize");
class InputModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.providerInput, { foreignKey: 'inputId', as: 'providerInputs' });
        this.belongsToMany(models.inventory, {
            through: models.inventoryInput,
            foreignKey: 'inputId',
            as: 'inventories'
        });
        this.hasMany(models.preparationStepInput, {
            foreignKey: 'inputId',
            as: 'preparationStepInputs'
        });
        this.belongsTo(models.measure, { foreignKey: 'measureId', as: 'measure' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'inputs',
            modelName: 'input',
            timestamps: true
        };
    }
}
exports.InputModel = InputModel;
exports.inputSchema = {
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
    stock: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    presentation: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    suggestedStock: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    currentProviderId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    measureId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    inputCategoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    delete: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
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
