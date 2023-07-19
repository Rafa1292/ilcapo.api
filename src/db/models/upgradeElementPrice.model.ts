import { DataTypes, Model, Sequelize } from "sequelize";
import { UpgradeElementPriceAttributes } from "../../services/upgradeElementPrice/upgradeElementPrice.types";

export class UpgradeElementPriceModel extends Model implements UpgradeElementPriceAttributes {
  public id!: number;
  public upgradeId!: number;
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
      tableName: "upgradePrices",
      modelName: "upgradePrice",
      timestamps: true,
    };
  }
}

export const upgradeElementPriceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  upgradeId: {
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
