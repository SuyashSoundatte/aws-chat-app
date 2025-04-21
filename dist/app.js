"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// global middlewares
const allowedOrigins = ['http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// routes imports
const auth_routes_1 = __importDefault(require("../src/routes/auth.routes"));
const GlobalErrorHandler_1 = __importDefault(require("./utils/GlobalErrorHandler"));
// routes declarations
app.use('/api/v1', auth_routes_1.default);
app.use(GlobalErrorHandler_1.default);
// dafualt routes
app.get('/', (req, res) => {
    res.send("Yare Yare.... watashi no server des!");
});
app.get('*', (req, res) => {
    res.send("Page not found: You lost like Zoro");
});
exports.default = app;
