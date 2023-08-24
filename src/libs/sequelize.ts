import { Sequelize } from 'sequelize'

// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new Sequelize('postgres://postgres:rafavilla2013@127.0.0.1:6432/nebulosa_db', {
  dialect: 'postgres'
})

// const sequelize = new Sequelize('postgres://postgres:rafavilla2013@postgres:5432/nebulosa_db', {
//   dialect: 'postgres'
// })

export default sequelize
