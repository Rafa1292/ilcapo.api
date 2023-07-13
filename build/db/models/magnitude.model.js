"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magnitudeSchema = exports.MagnitudeModel = void 0;
const sequelize_1 = require("sequelize");
class MagnitudeModel extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.measure, { foreignKey: 'magnitudeId' });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'magnitudes',
            modelName: 'magnitude',
            timestamps: true
        };
    }
}
exports.MagnitudeModel = MagnitudeModel;
exports.magnitudeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true
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
