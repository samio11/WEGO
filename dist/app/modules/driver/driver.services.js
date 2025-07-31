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
exports.driverServices = void 0;
const AppError_1 = require("../../errors/AppError");
const ride_interface_1 = require("../ride/ride.interface");
const ride_model_1 = require("../ride/ride.model");
const user_model_1 = require("../user/user.model");
const driver_model_1 = require("./driver.model");
const acceptRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(payload);
    const isRideExist = yield ride_model_1.Ride.findById(payload.rideId);
    if (!isRideExist) {
        throw new AppError_1.AppError(404, "Requested Ride Not Exists");
    }
    const isDriverExist = yield user_model_1.User.findById(payload.driverId);
    if (!isDriverExist) {
        throw new AppError_1.AppError(404, "Driver is not exists");
    }
    if (isRideExist.status && isRideExist.status !== ride_interface_1.ERideStatus.requested) {
        throw new AppError_1.AppError(401, `The Ride is already ${isRideExist.status}`);
    }
    const newAcceptRide = yield ride_model_1.Ride.findByIdAndUpdate(payload.rideId, {
        driverId: payload.driverId,
        status: ride_interface_1.ERideStatus.accepted,
        statusHistory: [
            ...isRideExist.statusHistory,
            { status: ride_interface_1.ERideStatus.accepted, time: Date.now() },
        ],
    }, { new: true });
    return newAcceptRide;
});
const pickedUpRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRideExist = yield ride_model_1.Ride.findById(payload.rideId);
    if (!isRideExist) {
        throw new AppError_1.AppError(404, "Requested Ride Not Exists");
    }
    const isDriverExist = yield user_model_1.User.findById(payload.driverId);
    if (!isDriverExist) {
        throw new AppError_1.AppError(404, "Driver is not exists");
    }
    if (isRideExist.status && isRideExist.status === ride_interface_1.ERideStatus.canceled) {
        throw new AppError_1.AppError(401, `The Ride is already ${isRideExist.status}`);
    }
    const newPickedUpRide = yield ride_model_1.Ride.findByIdAndUpdate(payload.rideId, {
        status: ride_interface_1.ERideStatus.picked_up,
        statusHistory: [
            ...isRideExist.statusHistory,
            { status: ride_interface_1.ERideStatus.picked_up, time: Date.now() },
        ],
    }, { new: true });
    return newPickedUpRide;
});
const inTransmitRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRideExist = yield ride_model_1.Ride.findById(payload.rideId);
    if (!isRideExist) {
        throw new AppError_1.AppError(404, "Requested Ride Not Exists");
    }
    const isDriverExist = yield user_model_1.User.findById(payload.driverId);
    if (!isDriverExist) {
        throw new AppError_1.AppError(404, "Driver is not exists");
    }
    if (isRideExist.status && isRideExist.status === ride_interface_1.ERideStatus.canceled) {
        throw new AppError_1.AppError(401, `The Ride is already ${isRideExist.status}`);
    }
    const newInTransmitRide = yield ride_model_1.Ride.findByIdAndUpdate(payload.rideId, {
        status: ride_interface_1.ERideStatus.in_transit,
        statusHistory: [
            ...isRideExist.statusHistory,
            { status: ride_interface_1.ERideStatus.in_transit, time: Date.now() },
        ],
    }, { new: true });
    return newInTransmitRide;
});
const completeRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield ride_model_1.Ride.startSession();
    session.startTransaction();
    try {
        const isRideExist = yield ride_model_1.Ride.findById(payload.rideId);
        if (!isRideExist) {
            throw new AppError_1.AppError(404, "Requested Ride Not Exists");
        }
        const isDriverExist = yield user_model_1.User.findById(payload.driverId);
        if (!isDriverExist) {
            throw new AppError_1.AppError(404, "Driver is not exists");
        }
        if (isRideExist.status && isRideExist.status === ride_interface_1.ERideStatus.canceled) {
            throw new AppError_1.AppError(401, `The Ride is already ${isRideExist.status}`);
        }
        const newInTransmitRide = yield ride_model_1.Ride.findByIdAndUpdate(payload.rideId, {
            status: ride_interface_1.ERideStatus.completed,
            statusHistory: [
                ...isRideExist.statusHistory,
                { status: ride_interface_1.ERideStatus.completed, time: Date.now() },
            ],
        }, { new: true, session });
        if (newInTransmitRide) {
            const updateDriverEarning = yield driver_model_1.Driver.findOneAndUpdate({ userId: payload.driverId }, { $inc: { earning: +Number(isRideExist.fare) } }, { new: true, session });
            if (!updateDriverEarning) {
                throw new AppError_1.AppError(401, "Some Error on Updating Earning Of Driver");
            }
        }
        yield session.commitTransaction();
        session.endSession();
        return newInTransmitRide;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const viewEarning = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield driver_model_1.Driver.findOne({ userId: payload }).select("earning");
    if (!existUser) {
        throw new AppError_1.AppError(404, "User Not Found!!!");
    }
    return existUser;
});
const updateAvailable = (driverId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_model_1.Driver.findOneAndUpdate({ userId: driverId }, { payload }, { new: true });
    return result;
});
exports.driverServices = {
    acceptRide,
    pickedUpRide,
    inTransmitRide,
    completeRide,
    viewEarning,
    updateAvailable,
};
