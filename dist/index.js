"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URLController_1 = require("./controller/URLController");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const MongoConnection_1 = require("./database/MongoConnection");
const port = 5000;
const api = (0, express_1.default)();
const database = new MongoConnection_1.MongoConnection();
database.connect();
const urlController = new URLController_1.URLController();
api.use((0, cors_1.default)());
api.use(express_1.default.json());
api.use(express_1.default.urlencoded());
api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);
api.listen(port, () => console.log(`Server up and running on port ${port}`));
//# sourceMappingURL=index.js.map