import { DataTypes, Model, Sequelize } from 'sequelize'
import { Product, ProductAttributes } from '../../services/product/product.types'
import { ProductModifier } from '../../services/productModifier/productModifier.types'

export class ProductModel extends Model implements ProductAttributes {
  public id!: number
  public name!: string
  public pictureUrl!: string
  public allowsModify!: boolean
  public needsCommand!: boolean
  public active!: boolean
  public productModifiers!: ProductModifier[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.productModifier, { foreignKey: 'productId', as: 'productModifiers' })
    this.hasMany(models.saleItemProduct, { foreignKey: 'productId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'products',
      modelName: 'product',
      timestamps: true
    }
  }

  public static getProduct (product: Product, userId: number): ProductAttributes {
    const now = new Date()
    return {
      ...product,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProduct (product: Partial<ProductAttributes>, userId: number): Partial<ProductAttributes> {
    const now = new Date()
    return {
      ...product,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const productSchema = {
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
  pictureUrl: {
    allowNull: false,
    type: DataTypes.STRING
  },
  needsCommand: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  allowsModify: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
