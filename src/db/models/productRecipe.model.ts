import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProductRecipe, ProductRecipeAttributes } from '../../services/productRecipe/productRecipe.types'
import { getNow } from '../../utils/timeManager'

export class ProductRecipeModel extends Model implements ProductRecipeAttributes {
  public id!: number
  public modifierElementId!: number
  public productId!: number
  public recipeId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  public static associate (models: any): void {
    this.belongsTo(models.product, { foreignKey: 'productId' })
    this.belongsTo(models.recipe, { foreignKey: 'recipeId' })
    this.belongsTo(models.modifierElement, { foreignKey: 'modifierElementId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'productRecipes',
      modelName: 'productRecipe',
      timestamps: false
    }
  }

  public static getProductRecipe (productRecipe: ProductRecipe, userId: number): ProductRecipeAttributes {
    const now = getNow()
    return {
      ...productRecipe,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProductRecipe (productRecipe: Partial<ProductRecipeAttributes>, userId: number): Partial<ProductRecipeAttributes> {
    const now = getNow()
    return {
      ...productRecipe,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const productRecipeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  modifierElementId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  productId: {
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
