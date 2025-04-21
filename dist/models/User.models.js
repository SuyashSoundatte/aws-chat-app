"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    sessionExpiresAt: {
        type: Date,
        immutable: true
    }
}, { timestamps: true });
userSchema.index({ sessionExpiresAt: 1 }, { expireAfterSeconds: 86400 });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
