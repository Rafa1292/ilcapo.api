import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierElementAttributes } from '../../services/modifierElement/modifierElement.types'
import { ModifierElementUpgrade } from '../../services/modifierElementUpgrade/modifierElementUpgrade.types'

export class ModifierElementModel extends Model implements ModifierElementAttributes {
  public id!: number
  public name!: string
  public price!: number
  public quantity!: number
  public defaultRecipeId!: number
  public combinable!: boolean
  public numberOfParts!: number
  public combinableModifierGroupId!: number
  public modifierElementUpgrade!: ModifierElementUpgrade
  public modifierGroupId!: number
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

    this.hasOne(models.productReference, {
      foreignKey: 'modifierElementId',
      as: 'productReference'
    })

    this.hasOne(models.modifierElementUpgrade, {
      foreignKey: 'modifierElementId',
      as: 'modifierElementUpgrade'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierElements',
      modelName: 'modifierElement',
      timestamps: true
    }
  }
}

export const modifierElementSchema = {
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
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  combinable: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  numberOfParts: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  combinableModifierGroupId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  modifierGroupId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  defaultRecipeId: {
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
