import { DataTypes, Model, Sequelize } from 'sequelize'
import { ModifierElement, ModifierElementAttributes } from '../../services/modifierElement/modifierElement.types'
import { ModifierElementUpgrade } from '../../services/modifierElementUpgrade/modifierElementUpgrade.types'
import { ElementPrice } from '../../services/elementPrice/elementPrice.types'
import { getNow } from '../../utils/timeManager'

export class ModifierElementModel extends Model implements ModifierElementAttributes {
  public id!: number
  public name!: string
  public defaultRecipeId!: number
  public combinable!: boolean
  public prices!: ElementPrice[]
  public combinableModifierGroupId!: number
  public modifierUpgrade!: ModifierElementUpgrade
  public modifierGroupId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.elementPrice, { foreignKey: 'elementId', as: 'prices' })
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
      as: 'modifierUpgrade'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'modifierElements',
      modelName: 'modifierElement',
      timestamps: false
    }
  }

  public static getModifierElement(modifierElement: ModifierElement, userId:number): ModifierElementAttributes{
    const now = getNow()
    return {
      ...modifierElement,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialModifierElement(modifierElement: Partial<ModifierElementAttributes>, userId:number): Partial<ModifierElementAttributes>{
    const now = getNow()
    return {
      ...modifierElement,
      updatedBy: userId,
      updatedAt: now
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
  combinable: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
