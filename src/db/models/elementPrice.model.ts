import { DataTypes, Model, Sequelize } from 'sequelize'
import { ElementPrice, ElementPriceAttributes } from '../../services/elementPrice/elementPrice.types'
import { getNow } from '../../utils/timeManager'

export class ElementPriceModel extends Model implements ElementPriceAttributes {
  public id!: number
  public elementId!: number
  public menuId!: number
  public price!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'elementPrices',
      modelName: 'elementPrice',
      timestamps: false,
    }
  }

  public static getElementPrice(elementPrice: ElementPrice, userId: number): ElementPriceAttributes {
    const now = getNow()
    return {
      ...elementPrice,
      createdBy: userId,
      updatedBy: userId,
      delete: false,
      createdAt: now,
      updatedAt: now,
    }
  }

  public static getPartialElementPrice(
    elementPrice: Partial<ElementPrice>,
    userId: number
  ): Partial<ElementPriceAttributes> {
    const now = getNow()
    return {
      ...elementPrice,
      updatedAt: now,
      updatedBy: userId,
    }
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
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}
