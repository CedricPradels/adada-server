"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startExpress = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../routes");
const constants_1 = require("../../config/constants");
exports.startExpress = (app = express_1.default(), router = routes_1.router) => {
    app.use('/', router);
    app.all('*', (_, res) => {
        res.status(404).json({ message: 'Not found.' });
    });
    app.listen(constants_1.constants.port, () => {
        console.log(`Server's listening at 127.0.0.1:${constants_1.constants.port}`);
    });
};
