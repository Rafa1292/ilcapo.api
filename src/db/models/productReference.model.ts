import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProductReferenceAttributes } from '../../services/productReference/productReference.types'

export class ProductReferenceModel extends Model implements ProductReferenceAttributes {
  public id!: number
  public productId!: number
  public modifierElementId!: number
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

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
      timestamps: true
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
  }
}
