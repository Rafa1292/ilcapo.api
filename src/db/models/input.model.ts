import { DataTypes, Model, Sequelize } from 'sequelize'
import { InputAttributes } from '../../services/input/input.types'

export class InputModel extends Model implements InputAttributes {
  public id!: number
  public name!: string
  public lowerPrice!: number
  public upperPrice!: number
  public currentPrice!: number
  public lastPrice!: number
  public expectedPrice!: number
  public stock!: number
  public presentation!: number
  public suggestedStock!: number
  public currentProviderId!: number
  public measureId!: number
  public inputCategoryId!: number
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.belongsToMany(models.provider, {
      through: models.providerInput,
      foreignKey: 'inputModelId',
      as: 'providers'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inputs',
      modelName: 'input',
      timestamps: true
    }
  }
}

export const inputSchema = {
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
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  presentation: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  suggestedStock: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  currentProviderId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  inputCategoryId: {
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
