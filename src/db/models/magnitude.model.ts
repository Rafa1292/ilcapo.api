import { DataTypes, Model, Sequelize } from 'sequelize'
import { Magnitude, MagnitudeAttributes } from '../../services/magnitude/magnitude.types'
import { getNow } from '../../utils/timeManager'

export class MagnitudeModel extends Model implements MagnitudeAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.measure, { foreignKey: 'magnitudeId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'magnitudes',
      modelName: 'magnitude',
      timestamps: false
    }
  }

  public static getMagnitude (magnitude: Magnitude, userId: number): MagnitudeAttributes {
    const now = getNow()
    return {
      ...magnitude,
      delete: false,
      createdBy: userId,
      updatedBy: userId,
      createdAt: now,
      updatedAt: now
    }
  }

  public static getPartialMagnitude (magnitude: Partial<MagnitudeAttributes>, userId: number): Partial<MagnitudeAttributes> {
    const now = getNow()
    return {
      ...magnitude,
      updatedBy: userId,
      updatedAt: now
    }
  }
}

export const magnitudeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true

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
