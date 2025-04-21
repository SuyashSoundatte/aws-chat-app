"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTION = exports.JWT_SEC = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.JWT_SEC) {
    throw new Error("Missing JWT_SEC in .env file");
}
if (!process.env.PRODUCTION) {
    throw new Error("Missing PRODUCTION in .env file");
}
const JWT_SEC = process.env.JWT_SEC;
exports.JWT_SEC = JWT_SEC;
const PRODUCTION = process.env.PRODUCTION;
exports.PRODUCTION = PRODUCTION;
