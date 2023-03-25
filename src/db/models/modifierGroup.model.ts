import { DataTypes, Model, Sequelize } from 'sequelize'
import { GroupElement } from '../../services/groupElement/groupElement.types'
import { ModifierGroupAttributes } from '../../services/modifierGroup/modifierGroup.types'
import { ModifierElementUpgrade } from '../../services/modifierElementUpgrade/modifierElementUpgrade.types'

export class ModifierGroupModel extends Model implements ModifierGroupAttributes {
  public id!: number
  public name!: string
  public minSelectable!: number
  public maxSelectable!: number
  public isRequired!: boolean
  public label!: string
  public elements!: GroupElement[]
  public modifierGroupUpgrade!: ModifierElementUpgrade
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    ModifierGroupModel.hasMany(models.groupElement, {
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
  minSelectable: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  maxSelectable: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isRequired: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  label: {
    allowNull: false,
    type: DataTypes.STRING
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
