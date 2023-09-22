import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierElementUpgrade, ModifierElementUpgradeAttributes } from '../../services/modifierElementUpgrade/modifierElementUpgrade.types'
import { UpgradeElementPrice } from '../../services/upgradeElementPrice/upgradeElementPrice.types'

export class ModifierElementUpgradeModel extends Model implements ModifierElementUpgradeAttributes {
  public id!: number
  public label!: string
  public createdBy!: number
  public updatedBy!: number
  public prices!: UpgradeElementPrice[]
  public modifierElementId!: number
  public newModifierGroupId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.upgradePrice, { foreignKey: 'upgradeId', as: 'prices' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierElementUpgrades',
      modelName: 'modifierElementUpgrade',
      timestamps: true
    }
  }

  public static getModifierElementUpgrade (modifierElementUpgrade: ModifierElementUpgrade, userId: number): ModifierElementUpgradeAttributes {
    const now = new Date()
    return {
      ...modifierElementUpgrade,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

    public static getPartialModifierElementUpgrade (modifierElementUpgrade: Partial<ModifierElementUpgrade>, userId: number): Partial<ModifierElementUpgradeAttributes> {
      const now = new Date()
      return {
        ...modifierElementUpgrade,
        updatedBy: userId,
        updatedAt: now
      }
    }

}

export const modifierElementUpgradeSchema = {
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
  modifierElementId: {
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
