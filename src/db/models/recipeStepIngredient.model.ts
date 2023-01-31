import { DataTypes, Model, Sequelize } from 'sequelize'
import { RecipeStepIngredientAttributes } from '../../services/recipeStepIngredient/recipeStepIngredient.type'

export class RecipeStepIngredientModel extends Model implements RecipeStepIngredientAttributes {
  public id!: number
  public recipeStepId!: number
  public ingredientId!: number
  public quantity!: number
  public measureId!: number
  public extra!: boolean
  public isOptional!: boolean
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // static associate (models: any): void {
  //   this.hasMany(models.input, { foreignKey: 'inputCategoryId' })
  // }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'recipeStepIngredients',
      modelName: 'recipeStepIngredient',
      timestamps: true
    }
  }
}

export const recipeStepIngredientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  recipeStepId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  ingredientId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  extra: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isOptional: {
    type: DataTypes.BOOLEAN,
    allowNull: false
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
