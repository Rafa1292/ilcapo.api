import { DataTypes, Model, Sequelize } from 'sequelize'
import { Ingredient, IngredientAttributes } from '../../services/ingredient/ingredient.types'
import { Measure } from '../../services/measure/measure.types'
import { PreparationStep } from '../../services/preparationStep/preparationStep.types'
import { getNow } from '../../utils/timeManager'

export class IngredientModel extends Model implements IngredientAttributes {
  public id!: number
  public name!: string
  public cost!: number
  public measureId!: number
  public ingredientCategoryId!: number
  public presentation!: number
  public price!: number
  public preparationSteps!: PreparationStep[]
  public measure!: Measure
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  public static getIngredient(ingredient: Ingredient, userId: number): IngredientAttributes {
    const now = getNow()
    return {
      ...ingredient,
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
      updatedBy: userId,
      delete: false,
    }
  }

  public static getPartialIngredient(ingredient: Partial<Ingredient>, userId: number): Partial<IngredientAttributes> {
    const now = getNow()
    return {
      ...ingredient,
      updatedAt: now,
      updatedBy: userId,
    }
  }

  static associate(models: any): void {
    this.hasMany(models.preparationStep, {
      foreignKey: 'ingredientId',
      as: 'preparationSteps',
    })
    this.belongsTo(models.measure, { foreignKey: 'measureId' })
  }

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'ingredients',
      modelName: 'ingredient',
      timestamps: false,
    }
  }
}

export const ingredientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ingredientCategoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  presentation: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
