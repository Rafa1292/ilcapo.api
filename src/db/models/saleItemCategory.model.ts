import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemCategoryAttributes } from '../../services/saleItemCategory/saleItemCategory.types'
import { SaleItem } from '../../services/saleItem/saleItem.types'

export class SaleItemCategoryModel extends Model implements SaleItemCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public saleItems!: SaleItem[]
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.saleItem, { foreignKey: 'saleItemCategoryId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'saleItemCategories',
      modelName: 'saleItemCategory',
      timestamps: true
    }
  }

  public static getSaleItemCategory (saleItemCategory: SaleItemCategoryAttributes, userId: number): SaleItemCategoryAttributes {
    const now = new Date()
    return {
      ...saleItemCategory,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialSaleItemCategory (saleItemCategory: Partial<SaleItemCategoryAttributes>, userId: number): Partial<SaleItemCategoryAttributes> {
    const now = new Date()
    return {
      ...saleItemCategory,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const saleItemCategorySchema = {
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
