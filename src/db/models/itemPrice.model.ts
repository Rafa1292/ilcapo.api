import { DataTypes, Model, Sequelize } from "sequelize";
import { ItemPrice, ItemPriceAttributes } from "../../services/itemPrice/itemPrice.types";
import { getNow } from "../../utils/timeManager";

export class ItemPriceModel extends Model implements ItemPriceAttributes {
  public id!: number;
  public itemId!: number;
  public menuId!: number;
  public price!: number;
  public delete!: boolean;
  public createdBy!: number;
  public updatedBy!: number;

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: "itemPrices",
      modelName: "itemPrice",
      timestamps: false,
    };
  }

  public static getItemPrice(itemPrice: ItemPrice, userId: number): ItemPriceAttributes {
    const now = getNow()
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
    const now = getNow()
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
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.STRING
  }
};
