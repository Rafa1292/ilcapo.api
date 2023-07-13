"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preparationStepInputSchema = exports.PreparationStepInputModel = void 0;
const sequelize_1 = require("sequelize");
class PreparationStepInputModel extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.input, {
            foreignKey: 'inputId',
            as: 'input'
        });
        this.belongsTo(models.preparationStep, {
            foreignKey: 'preparationStepId',
            as: 'preparationStep'
        });
        this.belongsTo(models.measure, {
            foreignKey: 'measureId',
            as: 'measure'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'preparationStepInputs',
            modelName: 'preparationStepInput',
            timestamps: true
        };
    }
}
exports.PreparationStepInputModel = PreparationStepInputModel;
exports.preparationStepInputSchema = {
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
    preparationStepId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    measureId: {
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
