import { Sequelize } from 'sequelize'

// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new Sequelize('postgres://postgres:rafavilla2013@postgres:5432/nebulosa_db', {
  dialect: 'postgres'
})

export default sequelize
