import { DataTypes, Model, Sequelize } from 'sequelize'
import { ProviderInputAttributes } from '../../services/providerInput/providerInput.types'

export class ProviderInputModel extends Model implements ProviderInputAttributes {
  public id!: number
  public inputModelId!: number
  public providerModelId!: number
  public lowerPrice!: number
  public currentPrice!: number
  public upperPrice!: number
  public lastPrice!: number
  public expectedPrice!: number
  public presentation!: number
  public measureId!: number
  public createdBy!: number
  public updatedBy!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'providerInputs',
      modelName: 'providerInput',
      timestamps: true
    }
  }
}

export const providerInputSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  inputModelId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  providerModelId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  lowerPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  upperPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  currentPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  lastPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  expectedPrice: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  presentation: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  measureId: {
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
