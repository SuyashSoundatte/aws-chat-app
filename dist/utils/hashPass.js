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
exports.hashPass = exports.verifyPass = void 0;
const argon2_1 = __importDefault(require("argon2"));
const hashPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        type: argon2_1.default.argon2id,
        memorycost: 2 ** 18,
        timecost: 4,
        hashLength: 64,
        saltLength: 16,
        parallelism: 2,
    };
    const hashedPass = yield argon2_1.default.hash(password, options);
    return hashedPass;
});
exports.hashPass = hashPass;
const verifyPass = (hashedPass, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield argon2_1.default.verify(hashedPass, pass);
    return isValid;
});
exports.verifyPass = verifyPass;
