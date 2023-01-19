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

if (config.dbUrl === undefined) {
  throw new Error('DB_URL is undefined')
}

export const sequelize = new Sequelize(config.dbUrl, options)
