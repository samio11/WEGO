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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const admin_model_1 = require("../admin/admin.model");
const driver_model_1 = require("../driver/driver.model");
const rider_model_1 = require("../rider/rider.model");
const user_interfaces_1 = require("./user.interfaces");
const user_model_1 = require("./user.model");
const createRider = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield user_model_1.User.startSession();
    session.startTransaction();
    try {
        const newUser = yield user_model_1.User.create([
            Object.assign(Object.assign({}, payload), { role: user_interfaces_1.ERole.RIDER }),
        ], { session });
        const newRider = yield rider_model_1.Rider.create([
            {
                userId: newUser[0]._id,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return newRider;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield user_model_1.User.startSession();
    session.startTransaction();
    try {
        const newUser = yield user_model_1.User.create([
            Object.assign(Object.assign({}, payload), { role: user_interfaces_1.ERole.ADMIN }),
        ], { session });
        const newAdmin = yield admin_model_1.Admin.create([
            {
                userId: newUser[0]._id,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const createDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield user_model_1.User.startSession();
    session.startTransaction();
    try {
        const newUser = yield user_model_1.User.create([
            Object.assign(Object.assign({}, payload), { role: user_interfaces_1.ERole.DRIVER }),
        ], { session });
        const newDriver = yield driver_model_1.Driver.create([
            {
                userId: newUser[0]._id,
                vehicleInfo: payload.vehicleInfo,
                currentLocation: payload.currentLocation,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return newDriver;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.userServices = { createRider, createAdmin, createDriver };
