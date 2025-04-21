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
exports.guestLogin = exports.registerUser = exports.loginUser = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const User_models_1 = __importDefault(require("../models/User.models"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const hashPass_1 = require("../utils/hashPass");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenarateUsername_1 = __importDefault(require("../utils/GenarateUsername"));
const config_1 = require("../config/config");
const loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string') {
        throw new ApiError_1.default(400, "All user fields must be strings");
    }
    if (!email || !password) {
        throw new ApiError_1.default(401, "All field are required...");
    }
    const user = yield User_models_1.default.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(402, "User Not Found! Pl Register...");
    }
    const verifyPassword = yield (0, hashPass_1.verifyPass)(user.password, password);
    if (!verifyPassword) {
        throw new ApiError_1.default(401, "Password is incorrect.. Pl try again...");
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email }, config_1.JWT_SEC, { expiresIn: "24h" });
    res.cookie("cookie", token, {
        httpOnly: true,
        secure: config_1.PRODUCTION === "production",
        maxAge: 24 * 60 * 60 * 1000,
    });
    return res.send(new ApiResponse_1.default(200, { user, token }, "User Created Successfully!"));
}));
exports.loginUser = loginUser;
const registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        throw new ApiError_1.default(400, "All user fields must be strings");
    }
    if (!username || !email || !password) {
        throw new ApiError_1.default(400, "All user fields required");
    }
    const userExisted = yield User_models_1.default.findOne({ email });
    if (userExisted) {
        throw new ApiError_1.default(400, "User already exist with this email!");
    }
    const hashPassword = yield (0, hashPass_1.hashPass)(password);
    const user = yield User_models_1.default.create({
        username: username,
        email: email,
        password: hashPassword
    });
    return res.send(new ApiResponse_1.default(201, user, "User registered successfully"));
}));
exports.registerUser = registerUser;
const guestLogin = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (0, GenarateUsername_1.default)();
    const userFound = yield User_models_1.default.findOne({ username });
    if (userFound) {
        throw new ApiError_1.default(400, "Username already exists...");
    }
    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = yield User_models_1.default.create({
        username: username,
        isGuest: true,
        sessionExpiresAt: sessionExpiresAt
    });
    const token = jsonwebtoken_1.default.sign({ username }, config_1.JWT_SEC, { expiresIn: "24h" });
    res.send(new ApiResponse_1.default(201, { user, token }, "Guest login successfully!"));
}));
exports.guestLogin = guestLogin;
