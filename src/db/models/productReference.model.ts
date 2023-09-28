import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProductReference, ProductReferenceAttributes } from '../../services/productReference/productReference.types'
import { getNow } from '../../utils/timeManager'

export class ProductReferenceModel extends Model implements ProductReferenceAttributes {
  public id!: number
  public productId!: number
  public modifierElementId!: number
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  // static associate (models: any): void {
  //   this.belongsTo(models.modifierElement, {
  //     foreignKey: 'modifierElementId',
  //     as: 'productReference'
  //   })
  // }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'productRefrences',
      modelName: 'productReference',
      timestamps: false
    }
  }

  public static getProductReference (productReference: ProductReference, userId: number): ProductReferenceAttributes {
    const now = getNow()
    return {
      ...productReference,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProductReference (productReference: Partial<ProductReferenceAttributes>, userId: number): Partial<ProductReferenceAttributes> {
    const now = getNow()
    return {
      ...productReference,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const productReferenceSchema = {
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
  modifierElementId: {
    allowNull: false,
    type: DataTypes.INTEGER
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
