import { DataTypes, Model, Sequelize } from "sequelize";
import { ItemPrice, ItemPriceAttributes } from "../../services/itemPrice/itemPrice.types";

export class ItemPriceModel extends Model implements ItemPriceAttributes {
  public id!: number;
  public itemId!: number;
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
      tableName: "itemPrices",
      modelName: "itemPrice",
      timestamps: true,
    };
  }

  public static getItemPrice(itemPrice: ItemPrice, userId: number): ItemPriceAttributes {
    const now = new Date();
    return {
      ...itemPrice,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    };
  }

  public static getPartialItemPrice(itemPrice: Partial<ItemPriceAttributes>, userId: number): Partial<ItemPriceAttributes> {
    const now = new Date();
    return {
      ...itemPrice,
      updatedBy: userId,
      updatedAt: now,
    };
  }
}

export const itemPriceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  itemId: {
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
