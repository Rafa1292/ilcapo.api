import { DataTypes, Model, Sequelize } from 'sequelize'
import { GroupElementAttributes } from '../../services/groupElement/groupElement.types'

export class GroupElementModel extends Model implements GroupElementAttributes {
  public id!: number
  public modifierGroupId!: number
  public modifierElementId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsTo(models.modifierElement, {
      foreignKey: 'modifierElementId',
      as: 'modifierElement'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'groupElements',
      modelName: 'groupElement',
      timestamps: true
    }
  }
}

export const groupElementSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  modifierGroupId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  modifierElementId: {
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
