import { DataTypes, Model, Sequelize } from 'sequelize'
import { PreparationStepAttributes } from '../../services/preparationStep/preparationStep.types'
import { PreparationStepInput } from '../../services/preparationStepInput/preparationStepInput.types'

export class PreparationStepModel extends Model implements PreparationStepAttributes {
  public id!: number
  public stepNumber!: number
  public description!: string
  public cost!: number
  public minutesOfPreparation!: number
  public ingredientId!: number
  public preparationStepInputs!: PreparationStepInput[]
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.preparationStepInput, {
      foreignKey: 'preparationStepId',
      as: 'preparationStepInputs'
    })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'preparationSteps',
      modelName: 'preparationStep',
      timestamps: true
    }
  }
}

export const preparationStepSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  stepNumber: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cost: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  minutesOfPreparation: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  ingredientId: {
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
