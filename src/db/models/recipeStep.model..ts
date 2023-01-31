import { DataTypes, Model, Sequelize } from 'sequelize'
import { RecipeStepAttributes } from '../../services/recipeStep/recipeStep.types'

export class RecipeStepModel extends Model implements RecipeStepAttributes {
  public id!: number
  public description!: string
  public cost!: number
  public stepNumber!: number
  public minutesOfPreparation!: number
  public recipeId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsToMany(models.ingredient, {
      through: models.recipeStepIngredient,
      foreignKey: 'recipeId',
      as: 'ingredients'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'recipeSteps',
      modelName: 'recipeStep',
      timestamps: true
    }
  }
}

export const recipeStepSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cost: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  stepNumber: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  minutesOfPreparation: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  recipeId: {
    allowNull: false,
    type: DataTypes.INTEGER
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
