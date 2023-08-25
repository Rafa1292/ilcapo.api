import { Sequelize } from 'sequelize'
import { config } from '../config/config'


const host = config.env === 'development' ? '127.0.0.1:6432' : 'postgres:5432'

const sequelize = new Sequelize(`postgres://postgres:rafavilla2013@${host}/nebulosa_db`, {
  dialect: 'postgres'
})

export default sequelize
