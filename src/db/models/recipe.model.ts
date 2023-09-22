import { DataTypes, Model, Sequelize } from 'sequelize'
import { Recipe, RecipeAttributes } from '../../services/recipe/recipe.types'
import { RecipeStep } from '../../services/recipeStep/recipeStep.types'

export class RecipeModel extends Model implements RecipeAttributes {
  public id!: number
  public name!: string
  public cost!: number
  public recipeSteps!: RecipeStep[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.recipeStep, { foreignKey: 'recipeId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'recipes',
      modelName: 'recipe',
      timestamps: true
    }
  }

  public static getRecipe (recipe: Recipe, userId: number): RecipeAttributes {
    const now = new Date()
    return {
      ...recipe,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialRecipe (recipe: Partial<RecipeAttributes>, userId: number): Partial<RecipeAttributes> {
    const now = new Date()
    return {
      ...recipe,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const recipeSchema = {
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
