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
exports.driverControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const jwt_1 = require("../../utils/jwt");
const config_1 = __importDefault(require("../../config"));
const driver_services_1 = require("./driver.services");
const sendResponse_1 = require("../../utils/sendResponse");
const acceptRide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const rideId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.rideId;
    const driverId = verifyTokenInfo.userId;
    const payload = {
        rideId,
        driverId,
    };
    const result = yield driver_services_1.driverServices.acceptRide(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride Accepted",
        data: result,
    });
}));
const picked_upRide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const rideId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.rideId;
    const driverId = verifyTokenInfo.userId;
    const payload = {
        rideId,
        driverId,
    };
    const result = yield driver_services_1.driverServices.pickedUpRide(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride Picked-UP",
        data: result,
    });
}));
const in_transit_ride = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const rideId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.rideId;
    const driverId = verifyTokenInfo.userId;
    const payload = {
        rideId,
        driverId,
    };
    const result = yield driver_services_1.driverServices.inTransmitRide(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride In-Transmit",
        data: result,
    });
}));
const completed_ride = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const rideId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.rideId;
    const driverId = verifyTokenInfo.userId;
    const payload = {
        rideId,
        driverId,
    };
    const result = yield driver_services_1.driverServices.completeRide(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Ride Completed",
        data: result,
    });
}));
const viewEarning = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const driverId = verifyTokenInfo.userId;
    const result = yield driver_services_1.driverServices.viewEarning(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Getting Driver Earning",
        data: result,
    });
}));
const updateAvailable = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const verifyTokenInfo = (0, jwt_1.validateToken)(accessToken, config_1.default.JWT_ACCESS_TOKEN);
    const driverId = verifyTokenInfo.userId;
    const payload = req.body.isAvailable;
    const result = yield driver_services_1.driverServices.updateAvailable(driverId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Driver Available Updated!!!",
        data: result,
    });
}));
exports.driverControllers = {
    acceptRide,
    picked_upRide,
    in_transit_ride,
    completed_ride,
    viewEarning,
    updateAvailable,
};
