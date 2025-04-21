"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statuscode, message = 'Something went wrong', error = 'Unknown error', data = null) {
        super(message);
        this.statuscode = statuscode;
        this.success = false;
        this.status = statuscode >= 400 && statuscode < 500 ? 'fail' : 'error';
        this.error = error;
        this.data = data;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            statusCode: this.statuscode,
            message: this.message,
            error: this.error,
            status: this.status,
            data: this.data,
            stack: this.stack,
        };
    }
}
exports.default = ApiError;
