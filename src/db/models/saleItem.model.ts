import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemAttributes } from '../../services/saleItem/saleItem.types'
import { ItemPrice } from '../../services/itemPrice/itemPrice.types'
import { SaleItemProduct } from '../../services/saleItemProduct/saleItemProduct.types'

export class SaleItemModel extends Model implements SaleItemAttributes {
  public id!: number
  public name!: string
  public saleItemCategoryId!: number
  public pictureUrl!: string
  public prices!: ItemPrice[]
  public saleItemProducts!: SaleItemProduct[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate(models: any): void {
    this.hasMany(models.itemPrice, { foreignKey: 'itemId', as: 'prices' })
    this.hasMany(models.saleItemProduct, {
      foreignKey: 'saleItemId',
      as: 'saleItemProducts',
    })
    this.belongsTo(models.saleItemCategory, {
      foreignKey: 'saleItemCategoryId',
    })
  }

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'saleItems',
      modelName: 'saleItem',
      timestamps: true,
    }
  }
}

export const saleItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  saleItemCategoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  pictureUrl: {
    allowNull: false,
    type: DataTypes.STRING,
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
}
