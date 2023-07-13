"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    env: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET
};
// module.exports = { config }
