"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewCustomResponse = void 0;
const response_type_1 = require("../utils/genericTypes/response.type");
const toNewCustomResponse = () => {
    try {
        return new response_type_1.CustomResponse();
    }
    catch (error) {
        return {
            content: undefined,
            message: [''],
            error: true,
            setContent(content) {
                this.content = content;
            },
            setMessage(message) {
                this.message = message;
            },
            setError(error) {
                this.error = error;
            },
            setResponse(content, message, error) {
                this.setContent(content);
                this.setMessage(message);
                this.setError(error);
            }
        };
    }
};
exports.toNewCustomResponse = toNewCustomResponse;
