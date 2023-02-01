import { DataTypes, Model, Sequelize } from 'sequelize'
import { BrandAttributes } from '../../services/brand/brand.types'

export class BrandModel extends Model implements BrandAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static associate (models: any): void {
    this.hasMany(models.providerInput, { foreignKey: 'brandId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'brands',
      modelName: 'brand',
      timestamps: true
    }
  }
}

export const brandSchema = {
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
