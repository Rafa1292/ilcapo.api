import { Sequelize } from 'sequelize'

// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new Sequelize('postgres://postgres:rafavilla2013@localhost:6432/ilcapo_db', {
  host: 'ilcapo_postgres',
  port: 5432,
  dialect: 'postgres'
})

export default sequelize
