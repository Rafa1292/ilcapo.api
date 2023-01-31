import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProductModifierAttributes } from '../../services/productModifier/productModifier.types'

export class ProductModifierModel extends Model implements ProductModifierAttributes {
  public id!: number
  public productId!: number
  public modifierGroupId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // static associate (models: any): void {
  //   this.belongsToMany(models.saleItem, {
  //     through: models.saleItemProduct,
  //     foreignKey: 'productId',
  //     as: 'saleItems'
  //   })

  //   this.hasOne(models.recipe, { foreignKey: 'productId' })
  // }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'productModifiers',
      modelName: 'productModifier',
      timestamps: true
    }
  }
}

export const productModifierSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  modifierGroupId: {
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
  }
}
