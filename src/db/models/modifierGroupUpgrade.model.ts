import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierGroupUpgradeAttributes } from '../../services/modifierGroupUpgrade/modifierGroupUpgrade.types'

export class ModifierGroupUpgradeModel extends Model implements ModifierGroupUpgradeAttributes {
  public id!: number
  public label!: string
  public createdBy!: number
  public updatedBy!: number
  public modifierGroupId!: number
  public newModifierGroupId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierGroupUpgrades',
      modelName: 'modifierGroupUpgrade',
      timestamps: true
    }
  }
}

export const modifierGroupSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  label: {
    allowNull: false,
    type: DataTypes.STRING
  },
  modifierGroupId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  newModifierGroupId: {
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
