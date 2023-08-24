"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new sequelize_1.Sequelize('postgres://postgres:rafavilla2013@127.0.0.1:6432/nebulosa_db', {
    dialect: 'postgres'
});
// const sequelize = new Sequelize('postgres://postgres:rafavilla2013@postgres:5432/nebulosa_db', {
//   dialect: 'postgres'
// })
exports.default = sequelize;
