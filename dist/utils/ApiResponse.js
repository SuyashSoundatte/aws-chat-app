"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(statuscode, data, message = '') {
        this.statuscode = statuscode,
            this.data = data,
            this.message = message;
    }
}
exports.default = ApiResponse;
