import { DataTypes, Model, Sequelize } from 'sequelize'
import { RecipeStep, RecipeStepAttributes } from '../../services/recipeStep/recipeStep.types'
import { RecipeStepIngredient } from '../../services/recipeStepIngredient/recipeStepIngredient.type'
import { getNow } from '../../utils/timeManager'

export class RecipeStepModel extends Model implements RecipeStepAttributes {
  public id!: number
  public description!: string
  public cost!: number
  public stepNumber!: number
  public minutesOfPreparation!: number
  public recipeId!: number
  public recipeStepIngredients!: RecipeStepIngredient[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.recipeStepIngredient, {
      foreignKey: 'recipeStepId',
      as: 'recipeStepIngredients'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'recipeSteps',
      modelName: 'recipeStep',
      timestamps: false
    }
  }

  public static getRecipeStep (recipeStep: RecipeStep, userId: number): RecipeStepAttributes {
    const now = getNow()
    return {
      ...recipeStep,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialRecipeStep (recipeStep: Partial<RecipeStepAttributes>, userId: number): Partial<RecipeStepAttributes> {
    const now = getNow()
    return {
      ...recipeStep,
      updatedBy: userId,
      updatedAt: now
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
    type: DataTypes.INTEGER
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
