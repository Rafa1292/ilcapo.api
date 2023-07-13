"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const options = {
    dialect: 'postgres',
    logging: !config_1.config.isProd,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};
// if (config.dbUrl === undefined) {
//   throw new Error('DB_URL is undefined')
// }
const sequelize = new sequelize_1.Sequelize('postgres://postgres:rafavilla2013@localhost:5432/ilcapo_db', options);
exports.default = sequelize;
