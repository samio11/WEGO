"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const config_1 = __importDefault(require("../config"));
const setCookie = (res, token) => {
    if (token.accessToken) {
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: config_1.default.NODE_ENV === "production",
            sameSite: "none",
        });
    }
    if (token.refreshToken) {
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: config_1.default.NODE_ENV === "production",
            sameSite: "none",
        });
    }
};
exports.setCookie = setCookie;
