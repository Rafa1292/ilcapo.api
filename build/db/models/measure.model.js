"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureSchema = exports.MeasureModel = void 0;
const sequelize_1 = require("sequelize");
class MeasureModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.input, { foreignKey: 'measureId' });
        this.belongsTo(models.magnitude, { foreignKey: 'magnitudeId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'measures',
            modelName: 'measure',
            timestamps: true
        };
    }
}
exports.MeasureModel = MeasureModel;
exports.measureSchema = {
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
    principalMeasure: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    value: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    magnitudeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    abbreviation: {
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
