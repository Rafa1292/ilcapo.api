import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemCategoryAttributes } from '../../services/saleItemCategory/saleItemCategory.types'

export class SaleItemCategoryModel extends Model implements SaleItemCategoryAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
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
