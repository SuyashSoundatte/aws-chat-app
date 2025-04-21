"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsers = exports.registerUsers = void 0;
const zod_1 = __importDefault(require("zod"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const registerUser = zod_1.default.object({
    username: zod_1.default.string().min(4).max(100),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    sessionExpiresAt: zod_1.default.date().optional()
});
const loginUser = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
const registerUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = registerUser.safeParse(req.body);
        if (!result.success) {
            throw new ApiError_1.default(400, "validate user error!", result.error.errors);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.registerUsers = registerUsers;
const loginUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = loginUser.safeParse(req.body);
        if (!result.success) {
            throw new ApiError_1.default(400, "validate user error!", result.error.errors);
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.loginUsers = loginUsers;
