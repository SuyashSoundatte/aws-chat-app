"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHandler = (error, req, res, next) => {
    error.statuscode = error.statuscode || 599;
    error.status = error.status || "error";
    res.status(error.statuscode).json({
        status: error.statuscode,
        message: error.message,
        stack: error.stack,
    });
};
exports.default = GlobalErrorHandler;
