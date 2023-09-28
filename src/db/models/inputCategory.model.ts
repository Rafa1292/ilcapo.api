import { DataTypes, Model, Sequelize } from 'sequelize'
import { InputCategory, InputCategoryAttributes } from '../../services/inputCategory/inputCategory.types'
import { getNow } from '../../utils/timeManager'

export class InputCategoryModel extends Model implements InputCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.input, { foreignKey: 'inputCategoryId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inputCategories',
      modelName: 'inputCategory',
      timestamps: false
    }
  }

  public static getInputCategory (inputCategory: InputCategory, userId: number): InputCategoryAttributes {
    const now = getNow()
    return {
      ...inputCategory,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialInputCategory (inputCategory: Partial<InputCategoryAttributes>, userId: number): Partial<InputCategoryAttributes> {
    const now = getNow()
    return {
      ...inputCategory,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const inputCategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.STRING
  }
}
