import { DataTypes, Model, Sequelize } from 'sequelize'
import { SaleItemProductAttributes } from '../../services/saleItemProduct/saleItemProduct.types'

export class SaleItemProductModel extends Model implements SaleItemProductAttributes {
  public id!: number
  public saleItemId!: number
  public productId!: number
  public quantity!: number
  public discount!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // static associate (models: any): void {
  //   this.hasMany(models.ingredient, { foreignKey: 'ingredientCategoryId' })
  // }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'saleItemProducts',
      modelName: 'saleItemProduct',
      timestamps: true
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
  }
}
