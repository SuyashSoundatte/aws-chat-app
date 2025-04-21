"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./utils/db"));
dotenv_1.default.config();
function StartServer() {
    const port = Number(process.env.PORT);
    (0, db_1.default)()
        .then(() => {
        app_1.default.on("error", (err) => {
            throw err;
        });
        app_1.default.listen(port, () => {
            console.log(`Connected to the Soul Society http://localhost:${port}`);
        });
    })
        .catch((err) => {
        console.log("Error: ", err);
        process.exit(1);
    });
}
StartServer();
