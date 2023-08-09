"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new sequelize_1.Sequelize('postgres://postgres:rafavilla2013@ilcapo_postgres:5432/ilcapo_db', {
    host: 'ilcapo_postgres',
    port: 5432,
    dialect: 'postgres'
});
exports.default = sequelize;
