import { DataTypes, Model, Sequelize } from 'sequelize'
import { InventoryInput, InventoryInputAttributes } from '../../services/inventoryInput/inventoryInput.types'
import { getNow } from '../../utils/timeManager'

export class InventoryInputModel extends Model implements InventoryInputAttributes {
  public id!: number
  public inventoryId!: number
  public inputId!: number
  public initialQuantity!: number
  public addedQuantity!: number
  public finalQuantity!: number
  public measureId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  // static associate (models: any): void {

  // }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inventoryInputs',
      modelName: 'inventoryInput',
      timestamps: false
    }
  }

  public static getInventoryInput (inventoryInput: InventoryInput, userId: number): InventoryInputAttributes {
    const now = getNow()
    return {
      ...inventoryInput,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialInventoryInput (inventoryInput: Partial<InventoryInputAttributes>, userId: number): Partial<InventoryInputAttributes> {
    const now = getNow()
    return {
      ...inventoryInput,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const inventoryInputSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  inventoryId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  inputId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  initialQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  addedQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  finalQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  measureId: {
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
