import { sequelize } from '../../libs/sequelize'
import { DataTypes } from 'sequelize'

export const ProviderModel = sequelize.define('provider', {
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
  spent: {
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
})
