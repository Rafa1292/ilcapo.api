import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemProduct, SaleItemProductAttributes } from '../../services/saleItemProduct/saleItemProduct.types'
import { Product } from '../../services/product/product.types'
import { getNow } from '../../utils/timeManager'

export class SaleItemProductModel extends Model implements SaleItemProductAttributes {
  public id!: number
  public saleItemId!: number
  public productId!: number
  public quantity!: number
  public discount!: number
  public product!: Product
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'product'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'saleItemProducts',
      modelName: 'saleItemProduct',
      timestamps: false
    }
  }

  public static getSaleItemProduct (saleItemProduct: SaleItemProduct, userId: number): SaleItemProductAttributes {
    const now = getNow()
    return {
      ...saleItemProduct,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialSaleItemProduct (saleItemProduct: Partial<SaleItemProductAttributes>, userId: number): Partial<SaleItemProductAttributes> {
    const now = getNow()
    return {
      ...saleItemProduct,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const saleItemProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  saleItemId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  discount: {
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
