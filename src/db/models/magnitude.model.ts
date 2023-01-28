import { DataTypes, Model, Sequelize } from 'sequelize'
import { MagnitudeAttributes } from '../../services/magnitude/magnitude.types'

export class MagnitudeModel extends Model implements MagnitudeAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.measure, { foreignKey: 'magnitudeId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'magnitudes',
      modelName: 'magnitude',
      timestamps: true
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
