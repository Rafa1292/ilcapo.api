import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemAttributes } from '../../services/saleItem/saleItem.types'

export class SaleItemModel extends Model implements SaleItemAttributes {
  public id!: number
  public name!: string
  public description!: string
  public price!: number
  public saleItemCategoryId!: number
  public pictureUrl!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.saleItemProduct, { foreignKey: 'saleItemId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'saleItems',
      modelName: 'saleItem',
      timestamps: true
    }
  }
}

export const saleItemSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  saleItemCategoryId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  pictureUrl: {
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
