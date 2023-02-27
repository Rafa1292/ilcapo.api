import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProductAttributes } from '../../services/product/product.types'

export class ProductModel extends Model implements ProductAttributes {
  public id!: number
  public name!: string
  public price!: number
  public description!: string
  public pictureUrl!: string
  public allowsModify!: boolean
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
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  pictureUrl: {
    allowNull: false,
    type: DataTypes.STRING
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
