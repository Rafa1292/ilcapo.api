import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierGroup } from '../../services/modifierGroup/modifierGroup.types'
import { ProductModifierAttributes } from '../../services/productModifier/productModifier.types'

export class ProductModifierModel extends Model implements ProductModifierAttributes {
  public id!: number
  public productId!: number
  public modifierGroupId!: number
  public order!: number
  public modifierGroup!: ModifierGroup
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsTo(models.modifierGroup, {
      foreignKey: 'modifierGroupId',
      as: 'modifierGroup'
    })
  }

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
  order: {
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
