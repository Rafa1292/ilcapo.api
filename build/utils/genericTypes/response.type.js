"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor() {
        this.content = null;
        this.message = [''];
        this.error = true;
    }
    setResponse(content, message, error) {
        this.setContent(content);
        this.setMessage(message);
        this.setError(error);
    }
    setContent(content) {
        this.content = content;
    }
    setMessage(message) {
        this.message = message;
    }
    setError(error) {
        this.error = error;
    }
}
exports.CustomResponse = CustomResponse;
