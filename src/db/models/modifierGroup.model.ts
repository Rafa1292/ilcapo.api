import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierGroupAttributes } from '../../services/modifierGroup/modifierGroup.types'
import { ModifierElementUpgrade } from '../../services/modifierElementUpgrade/modifierElementUpgrade.types'
import { ModifierElement } from '../../services/modifierElement/modifierElement.types'

export class ModifierGroupModel extends Model implements ModifierGroupAttributes {
  public id!: number
  public name!: string
  public showLabel!: boolean
  public elements!: ModifierElement[]
  public modifierGroupUpgrade!: ModifierElementUpgrade
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    ModifierGroupModel.hasMany(models.modifierElement, {
      foreignKey: 'modifierGroupId',
      as: 'elements'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierGroups',
      modelName: 'modifierGroup',
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
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  showLabel: {
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
