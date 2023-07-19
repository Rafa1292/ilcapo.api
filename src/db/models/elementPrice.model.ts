import { DataTypes, Model, Sequelize } from "sequelize";
import { ElementPriceAttributes } from "../../services/elementPrice/elementPrice.types";

export class ElementPriceModel extends Model implements ElementPriceAttributes {
  public id!: number;
  public elementId!: number;
  public menuId!: number;
  public price!: number;
  public delete!: boolean;
  public createdBy!: number;
  public updatedBy!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: "elementPrices",
      modelName: "elementPrice",
      timestamps: true,
    };
  }
}

export const elementPriceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  elementId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  menuId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};
