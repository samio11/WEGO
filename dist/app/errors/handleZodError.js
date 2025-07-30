"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    var _a;
    const errorSources = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((x) => {
        return {
            path: x === null || x === void 0 ? void 0 : x.path[(x === null || x === void 0 ? void 0 : x.path.length) - 1],
            message: x === null || x === void 0 ? void 0 : x.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Zod Error",
        errorSources,
    };
};
exports.handleZodError = handleZodError;
