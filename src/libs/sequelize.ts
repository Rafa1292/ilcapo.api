import { Options, Sequelize } from 'sequelize'
import { config } from '../config/config'

const options: Options = {
  dialect: 'postgres',
  logging: !config.isProd,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}

// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new Sequelize('postgres://postgres:rafavilla2013@localhost:5432/ilcapo_db', options)

export default sequelize
