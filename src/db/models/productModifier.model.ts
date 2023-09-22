import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierGroup } from '../../services/modifierGroup/modifierGroup.types'
import { ProductModifier, ProductModifierAttributes } from '../../services/productModifier/productModifier.types'

export class ProductModifierModel extends Model implements ProductModifierAttributes {
  public id!: number
  public productId!: number
  public modifierGroupId!: number
  public order!: number
  public price!: number
  public minSelect!: number
  public maxSelect!: number
  public priceByGroup!: boolean
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

  public static getProductModifier(productModifier: ProductModifier, userId:number): ProductModifierAttributes{
    const now = new Date()
    return {
      ...productModifier,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProductModifier(productModifier: Partial<ProductModifierAttributes>, userId:number): Partial<ProductModifierAttributes>{
    const now = new Date()
    return {
      ...productModifier,
      updatedBy: userId,
      updatedAt: now
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
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  minSelect: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  maxSelect: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  priceByGroup: {
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
