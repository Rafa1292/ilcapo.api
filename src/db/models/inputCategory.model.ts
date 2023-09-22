import { DataTypes, Model, Sequelize } from 'sequelize'
import { InputCategoryAttributes } from '../../services/inputCategory/inputCategory.types'

export class InputCategoryModel extends Model implements InputCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.input, { foreignKey: 'inputCategoryId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inputCategories',
      modelName: 'inputCategory',
      timestamps: true
    }
  }

  public static getInputCategory (inputCategory: InputCategoryAttributes, userId: number): InputCategoryAttributes {
    const now = new Date()
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
    const now = new Date()
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
    type: DataTypes.STRING
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
  }
}
