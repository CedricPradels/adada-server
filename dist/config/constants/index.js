"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.constants = {
    port: process.env.PORT || 4000,
};
