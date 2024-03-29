import { DataTypes, Model, Sequelize } from 'sequelize'
import { PreparationStepInput, PreparationStepInputAttributes } from '../../services/preparationStepInput/preparationStepInput.types'
import { getNow } from '../../utils/timeManager'

export class PreparationStepInputModel extends Model implements PreparationStepInputAttributes {
  public id!: number
  public inputId!: number
  public preparationStepId!: number
  public quantity!: number
  public measureId!: number
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  public static associate (models: any): void {
    this.belongsTo(models.input, {
      foreignKey: 'inputId',
      as: 'input'
    })
    this.belongsTo(models.preparationStep, {
      foreignKey: 'preparationStepId',
      as: 'preparationStep'
    })
    this.belongsTo(models.measure, {
      foreignKey: 'measureId',
      as: 'measure'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'preparationStepInputs',
      modelName: 'preparationStepInput',
      timestamps: false
    }
  }

  public static getPeparationStepInput (preparationStepInput: PreparationStepInput, userId: number): PreparationStepInputAttributes {
    const now = getNow()
    return {
      ...preparationStepInput,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialPeparationStepInput (preparationStepInput: Partial<PreparationStepInputAttributes>, userId: number): Partial<PreparationStepInputAttributes> {
    const now = getNow()
    return {
      ...preparationStepInput,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const preparationStepInputSchema = {
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
  preparationStepId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  quantity: {
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
