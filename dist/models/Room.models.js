"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const roomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isPrivate: {
        type: zod_1.boolean,
        default: false,
    },
    password: {
        type: String,
        optional: true
    },
    participents: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });
const Room = mongoose_1.default.model("Room", roomSchema);
exports.default = Room;
