
module.exports = {
    development: {
      url: 'postgres://postgres:rafavilla2013@127.0.0.1:6432/nebulosa_db',
      dialect: 'postgres'
    },
    production: {
      url: 'postgres://postgres:rafavilla2013@127.0.0.1:6432/nebulosa_db',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  }
  
