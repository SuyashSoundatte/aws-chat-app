"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = __importDefault(require("chance"));
const uuid_1 = require("uuid");
const chance = new chance_1.default();
const nameGenerate = () => {
    const randomWord1 = chance.word();
    const id = (0, uuid_1.v4)();
    const randomName = `${randomWord1}-${id}`;
    return randomName;
};
exports.default = nameGenerate;
