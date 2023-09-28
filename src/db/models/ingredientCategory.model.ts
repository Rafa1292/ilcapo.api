import { DataTypes, Model, Sequelize } from 'sequelize'
import { IngredientCategory, IngredientCategoryAttributes } from '../../services/ingredientCategory/ingredientCategory.types'
import { getNow } from '../../utils/timeManager'

export class IngredientCategoryModel extends Model implements IngredientCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.ingredient, { foreignKey: 'ingredientCategoryId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'ingredientCategories',
      modelName: 'ingredientCategory',
      timestamps: false
    }
  }

  public static getIngredientCategory(category: IngredientCategory, userId:number): IngredientCategoryAttributes {
    const now = getNow()
    return {
      ...category,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialIngredientCategory(category: Partial<IngredientCategory>, userId:number): Partial<IngredientCategoryAttributes> {
    const now = getNow()
    return {
      ...category,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const ingredientCategorySchema = {
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
