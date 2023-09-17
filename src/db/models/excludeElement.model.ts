import { DataTypes, Model, Sequelize } from 'sequelize'
import { ExcludeElementAttributes } from '../../services/excludeElement/excludeElement.types'

export class ExcludeElementModel
  extends Model
  implements ExcludeElementAttributes
{
  public id!: number
  public productModifierId!: number
  public modifierElementId!: number
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'excludeElements',
      modelName: 'excludeElement',
      timestamps: true
    }
  }
}



export const excludeElementSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  productModifierId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  modifierElementId: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
