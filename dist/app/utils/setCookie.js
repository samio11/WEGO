"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, token) => {
    if (token.accessToken) {
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: false,
        });
    }
    if (token.refreshToken) {
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
        });
    }
};
exports.setCookie = setCookie;
