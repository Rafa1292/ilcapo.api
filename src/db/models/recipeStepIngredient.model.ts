import { DataTypes, Model, Sequelize } from 'sequelize'
import { RecipeStepIngredient, RecipeStepIngredientAttributes } from '../../services/recipeStepIngredient/recipeStepIngredient.type'
import { getNow } from '../../utils/timeManager'

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

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.belongsTo(models.ingredient, {
      foreignKey: 'ingredientId',
      as: 'ingredient'
    })

    this.belongsTo(models.recipeStep, {
      foreignKey: 'recipeStepId',
      as: 'recipeStep'
    })

    this.belongsTo(models.measure, {
      foreignKey: 'measureId',
      as: 'measure'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'recipeStepIngredients',
      modelName: 'recipeStepIngredient',
      timestamps: false
    }
  }

  public static getRecipeStepIngredient (recipeStepIngredient: RecipeStepIngredient, userId: number): RecipeStepIngredientAttributes {
    const now = getNow()
    return {
      ...recipeStepIngredient,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialRecipeStepIngredient (recipeStepIngredient: Partial<RecipeStepIngredientAttributes>, userId: number): Partial<RecipeStepIngredientAttributes> {
    const now = getNow()
    return {
      ...recipeStepIngredient,
      updatedBy: userId,
      updatedAt: now
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
