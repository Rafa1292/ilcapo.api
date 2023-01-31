import { DataTypes, Model, Sequelize } from 'sequelize'
import { RecipeAttributes } from '../../services/recipe/recipe.types'

export class RecipeModel extends Model implements RecipeAttributes {
  public id!: number
  public description!: string
  public cost!: number
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
}

export const recipeSchema = {
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
