"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const AppError_1 = require("../errors/AppError");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const driver_model_1 = require("../modules/driver/driver.model");
const user_interfaces_1 = require("../modules/user/user.interfaces");
const driver_interface_1 = require("../modules/driver/driver.interface");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.AppError(404, "Token Is Not Found!!!");
        }
        const verifyAccessToken = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
        const existUser = yield user_model_1.User.findOne({ email: verifyAccessToken.email });
        if (!existUser) {
            throw new AppError_1.AppError(404, "User is Not found!!!");
        }
        if (existUser.isBlocked === true) {
            throw new AppError_1.AppError(401, "User is Blocked");
        }
        if (existUser.role === user_interfaces_1.ERole.DRIVER) {
            const existDriver = yield driver_model_1.Driver.findOne({ userId: existUser === null || existUser === void 0 ? void 0 : existUser._id });
            if (!existDriver) {
                throw new AppError_1.AppError(401, "Driver is Not exists");
            }
            if (existDriver.isApproved === false ||
                existDriver.isAvailable === driver_interface_1.EAvailable.OFFLINE) {
                throw new AppError_1.AppError(401, "This Driver Is not Allowed!!!");
            }
        }
        if (!authRoles.includes(verifyAccessToken.role)) {
            throw new AppError_1.AppError(401, "Access Denied!!!");
        }
        req.user = verifyAccessToken;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.checkAuth = checkAuth;
