import { DataTypes, Model, Sequelize } from 'sequelize'
import { Brand } from '../../services/brand/brand.types'
import { Input } from '../../services/input/input.types'
import { Measure } from '../../services/measure/measure.types'
import { Provider } from '../../services/provider/provider.types'
import { ProviderInput, ProviderInputAttributes } from '../../services/providerInput/providerInput.types'
import { getNow } from '../../utils/timeManager'

export class ProviderInputModel extends Model implements ProviderInputAttributes {
  public id!: number
  public inputId!: number
  public providerId!: number
  public lowerPrice!: number
  public currentPrice!: number
  public upperPrice!: number
  public lastPrice!: number
  public expectedPrice!: number
  public presentation!: number
  public measureId!: number
  public brandId!: number
  public provider!: Provider
  public input!: Input
  public measure!: Measure
  public brand!: Brand
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number
  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.belongsTo(models.input, { foreignKey: 'inputId', as: 'input' })
    this.belongsTo(models.provider, { foreignKey: 'providerId', as: 'provider' })
    this.belongsTo(models.measure, { foreignKey: 'measureId', as: 'measure' })
    this.belongsTo(models.brand, { foreignKey: 'brandId', as: 'brand' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'providerInputs',
      modelName: 'providerInput',
      timestamps: false
    }
  }

  public static getProviderInput (providerInput: ProviderInput, userId: number): ProviderInputAttributes {
    const now = getNow()
    return {
      ...providerInput,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProviderInput (providerInput: Partial<ProviderInputAttributes>, userId: number): Partial<ProviderInputAttributes> {
    const now = getNow()
    return {
      ...providerInput,
      updatedBy: userId,
      updatedAt: now
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
  inputId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  providerId: {
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
    type: DataTypes.FLOAT
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  brandId: {
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
