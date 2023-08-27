"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const host = config_1.config.env === 'development' ? '127.0.0.1:6432' : 'postgres:5432';
const sequelize = new sequelize_1.Sequelize(`postgres://postgres:rafavilla2013@${host}/nebulosa_db`, {
    dialect: 'postgres'
});
exports.default = sequelize;
