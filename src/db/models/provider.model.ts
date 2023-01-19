import { sequelize } from '../../libs/sequelize'
import { DataTypes, Model } from 'sequelize'
import { ProviderVM, ProviderAttributes } from '../../services/types'

class ProviderModel extends Model<ProviderAttributes, ProviderVM> implements ProviderAttributes {
  public id!: number
  public name!: string
  public phone!: number
  public fixedExpense!: boolean
  public createdBy!: number
  public updatedBy!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ProviderModel.init({
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
    type: DataTypes.STRING
  },
  fixedExpense: {
    type: DataTypes.BOOLEAN
  },
  createdBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  updatedBy: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
},
{
  timestamps: true,
  sequelize,
  tableName: 'providers'
})

export default ProviderModel
