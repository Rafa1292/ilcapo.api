import { DataTypes, Model, Sequelize } from 'sequelize'
import { InventoryAttributes } from '../../services/inventory/inventory.types'

export class InventoryModel extends Model implements InventoryAttributes {
  public id!: number
  public initialValue!: number
  public finalValue!: number
  public addedValue!: number
  public initialDate!: Date
  public finalDate!: Date
  public investedPercentage!: number
  public createdBy!: number
  public updatedBy!: number
  public delete!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsToMany(models.input, {
      through: models.inventoryInput,
      foreignKey: 'inventoryId',
      as: 'inputs'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inventories',
      modelName: 'inventory',
      timestamps: true
    }
  }
}

export const inventorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  initialValue: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  finalValue: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  addedValue: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  initialDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  finalDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  investedPercentage: {
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
