import { DataTypes, Model, Sequelize } from 'sequelize'
import { IngredientCategoryAttributes } from '../../services/ingredientCategory/ingredientCategory.types'

export class IngredientCategoryModel extends Model implements IngredientCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.ingredient, { foreignKey: 'ingredientCategoryId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'ingredientCategories',
      modelName: 'ingredientCategory',
      timestamps: true
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
  }
}
