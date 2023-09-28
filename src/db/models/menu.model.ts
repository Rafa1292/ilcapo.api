import { DataTypes, Model, Sequelize } from "sequelize";
import { Menu, MenuAttributes } from "../../services/menu/menu.types";
import { getNow } from "../../utils/timeManager";

export class MenuModel extends Model implements MenuAttributes {
  public id!: number;
  public name!: string;
  public comissionPercentage!: number;
  public delete!: boolean;
  public createdBy!: number;
  public updatedBy!: number;

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: "menus",
      modelName: "menu",
      timestamps: false,
    };
  }

  public static getMenu(menu: Menu, userId: number): MenuAttributes {
    const now = getNow()
    return {
      ...menu,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    };
  }

  public static getPartialMenu(menu: Partial<MenuAttributes>, userId: number): Partial<MenuAttributes> {
    const now = getNow()
    return {
      ...menu,
      updatedBy: userId,
      updatedAt: now,
    };
  }
}

export const menuSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  comissionPercentage: {
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
