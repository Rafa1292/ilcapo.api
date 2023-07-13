"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparationStepSchema = exports.PreparationStepModel = void 0;
const sequelize_1 = require("sequelize");
class PreparationStepModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.preparationStepInput, {
            foreignKey: 'preparationStepId',
            as: 'preparationStepInputs'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'preparationSteps',
            modelName: 'preparationStep',
            timestamps: true
        };
    }
}
exports.PreparationStepModel = PreparationStepModel;
exports.preparationStepSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    stepNumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    cost: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    minutesOfPreparation: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    ingredientId: {
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
