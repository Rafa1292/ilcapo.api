import { DataTypes, Model, Sequelize } from 'sequelize'
import { IngredientAttributes } from '../../services/ingredient/ingredient.types'
import { PreparationStep } from '../../services/preparationStep/preparationStep.types'

export class IngredientModel extends Model implements IngredientAttributes {
  public id!: number
  public name!: string
  public cost!: number
  public measureId!: number
  public ingredientCategoryId!: number
  public presentation!: number
  public price!: number
  public preparationSteps!: PreparationStep[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.preparationStep, { foreignKey: 'ingredientId' })

    this.belongsToMany(models.recipeStep, {
      through: models.recipeStepIngredient,
      foreignKey: 'ingredientId',
      as: 'recipeSteps'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'ingredients',
      modelName: 'ingredient',
      timestamps: true
    }
  }
}

export const ingredientSchema = {
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
  cost: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  ingredientCategoryId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  presentation: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
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
