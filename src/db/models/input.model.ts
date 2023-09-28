import { DataTypes, Model, Sequelize } from 'sequelize'
import { Input, InputAttributes } from '../../services/input/input.types'
import { getNow } from '../../utils/timeManager'

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
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  public static getInput(input: Input, userId: number): InputAttributes {
    const now = getNow()
    return {
      ...input,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now,
    }
  }

  public static getPartialInput(input: Partial<InputAttributes>, userId: number): Partial<InputAttributes> {
    const now = getNow()
    return {
      ...input,
      updatedBy: userId,
      updatedAt: now,
    }
  }

  static associate(models: any): void {
    this.hasMany(models.providerInput, {
      foreignKey: 'inputId',
      as: 'providerInputs',
    })

    this.belongsToMany(models.inventory, {
      through: models.inventoryInput,
      foreignKey: 'inputId',
      as: 'inventories',
    })
    this.hasMany(models.preparationStepInput, {
      foreignKey: 'inputId',
      as: 'preparationStepInputs',
    })

    this.belongsTo(models.measure, { foreignKey: 'measureId', as: 'measure' })
  }

  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'inputs',
      modelName: 'input',
      timestamps: false,
    }
  }
}

export const inputSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  lowerPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  upperPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  currentPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  lastPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  expectedPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  presentation: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  suggestedStock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  currentProviderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  measureId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inputCategoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  delete: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
