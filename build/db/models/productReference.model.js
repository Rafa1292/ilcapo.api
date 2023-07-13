"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReferenceSchema = exports.ProductReferenceModel = void 0;
const sequelize_1 = require("sequelize");
class ProductReferenceModel extends sequelize_1.Model {
    // static associate (models: any): void {
    //   this.belongsTo(models.modifierElement, {
    //     foreignKey: 'modifierElementId',
    //     as: 'productReference'
    //   })
    // }
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'productRefrences',
            modelName: 'productReference',
            timestamps: true
        };
    }
}
exports.ProductReferenceModel = ProductReferenceModel;
exports.productReferenceSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    productId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    modifierElementId: {
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
