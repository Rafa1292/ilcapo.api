import { DataTypes, Model, Sequelize } from 'sequelize'
import { Provider, ProviderAttributes } from '../../services/provider/provider.types'
import { getNow } from '../../utils/timeManager'
export class ProviderModel extends Model implements ProviderAttributes {
  public id!: number
  public name!: string
  public phone!: number
  public fixedExpense!: boolean
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.providerInput, { foreignKey: 'providerId', as: 'providerInputs' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'providers',
      modelName: 'provider',
      timestamps: false
    }
  }

  public static getProvider (provider: Provider, userId: number): ProviderAttributes {
    const now = getNow()
    return {
      ...provider,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialProvider (provider: Partial<ProviderAttributes>, userId: number): Partial<ProviderAttributes> {
    const now = getNow()
    return {
      ...provider,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const providerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  phone: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  fixedExpense: {
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
