import { DataTypes, Model, Sequelize } from 'sequelize'
import {
  ExcludeElement,
  ExcludeElementAttributes,
} from '../../services/excludeElement/excludeElement.types'

export class ExcludeElementModel
  extends Model
  implements ExcludeElementAttributes
{
  public id!: number
  public productModifierId!: number
  public modifierElementId!: number
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getExcludeElement(
    excludeElement: ExcludeElement,
    userId: number
  ): ExcludeElementAttributes {
    const now = new Date()
    return {
      ...excludeElement,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    }
  }

  public static getPartialExcludeElement(
    excludeElement: Partial<ExcludeElement>,
    userId: number
  ): Partial<ExcludeElementAttributes> {
    const now = new Date()
    return {
      ...excludeElement,
      updatedBy: userId,
      updatedAt: now,
    }
  }
  
  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'excludeElements',
      modelName: 'excludeElement',
      timestamps: true,
    }
  }
}

export const excludeElementSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productModifierId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  modifierElementId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}
