"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error) => {
    var _a;
    if (error.name === 'UnauthorizedError' &&
        error.inner.name === 'TokenExpiredError') {
        return ['Token expired'];
    }
    if (((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const errors = error.errors.map((err) => {
            return err.message;
        });
        return errors;
    }
    if (error instanceof Error) {
        return [error.message];
    }
};
exports.errorHandler = errorHandler;
