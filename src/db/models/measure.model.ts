import { DataTypes, Model, Sequelize } from 'sequelize'
import { Measure, MeasureAttributes } from '../../services/measure/measure.types'

export class MeasureModel extends Model implements MeasureAttributes {
  public id!: number
  public name!: string
  public principalMeasure!: boolean
  public value!: number
  public magnitudeId!: number
  public abbreviation!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.input, { foreignKey: 'measureId' })
    this.belongsTo(models.magnitude, { foreignKey: 'magnitudeId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'measures',
      modelName: 'measure',
      timestamps: true
    }
  }

  public static getMeasure (measure: Measure, userId: number): MeasureAttributes {
    const now = new Date()
    return {
      ...measure,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialMeasure (measure: Partial<MeasureAttributes>, userId: number): Partial<MeasureAttributes> {
    const now = new Date()
    return {
      ...measure,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const measureSchema = {
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
  principalMeasure: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  value: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  magnitudeId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  abbreviation: {
    allowNull: false,
    type: DataTypes.STRING
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
