import { DataTypes, Model, Sequelize } from 'sequelize'
import { Brand, BrandAttributes } from '../../services/brand/brand.types'
import { getNow } from '../../utils/timeManager'

export class BrandModel extends Model implements BrandAttributes {
  public id!: number
  public name!: string
  public delete!: boolean
  public createdBy!: number
  public updatedBy!: number
  public readonly createdAt!: string
  public readonly updatedAt!: string

  static associate (models: any): void {
    this.hasMany(models.providerInput, { foreignKey: 'brandId' })
  }

  static config (sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: 'brands',
      modelName: 'brand',
      timestamps: false
    }
  }

  public static getBrand (brand: Brand, userId: number): BrandAttributes {
    const now = getNow()  
     return {
      ...brand,
      createdAt: now,
      updatedAt: now,
      delete: false,
      createdBy: userId,
      updatedBy: userId
    }
  }

  public static getPartialBrand (brand: Partial<BrandAttributes>, userId: number): Partial<BrandAttributes> {
    const now = getNow()
    return {
      ...brand,
      updatedAt: now,
      updatedBy: userId
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
