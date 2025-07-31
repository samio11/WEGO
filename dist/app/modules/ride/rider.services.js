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
exports.rideServices = void 0;
const AppError_1 = require("../../errors/AppError");
const rider_model_1 = require("../rider/rider.model");
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const createRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield ride_model_1.Ride.startSession();
    session.startTransaction();
    try {
        const existRider = yield rider_model_1.Rider.findOne({ userId: payload.riderId });
        if (!existRider) {
            throw new AppError_1.AppError(404, "Rider is Not Found");
        }
        const statusHistory = [
            {
                status: ride_interface_1.ERideStatus.requested,
                time: Date.now(),
            },
        ];
        const newRide = yield ride_model_1.Ride.create([Object.assign(Object.assign({}, payload), { statusHistory })], {
            session,
        });
        if (newRide) {
            yield rider_model_1.Rider.findOneAndUpdate({ userId: payload.riderId }, { $inc: { totalRides: +1 } }, { new: true, session });
        }
        yield session.commitTransaction();
        session.endSession();
        return newRide;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
const cancelRide = (payload, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield ride_model_1.Ride.startSession();
    session.startTransaction();
    try {
        const existRide = yield ride_model_1.Ride.findById(payload);
        if (!existRide) {
            throw new AppError_1.AppError(404, "Ride is not exists!!!");
        }
        if (existRide.riderId.toString() !== riderId) {
            throw new AppError_1.AppError(401, "This Rider cant cancel Ride");
        }
        if (existRide.status === ride_interface_1.ERideStatus.requested) {
            throw new AppError_1.AppError(401, "You Cant Cancel,Please wait for Accept Approval");
        }
        const updateRide = yield ride_model_1.Ride.findByIdAndUpdate(payload, { status: ride_interface_1.ERideStatus.canceled }, { new: true, session });
        if (updateRide) {
            const riderUpdate = yield rider_model_1.Rider.findOneAndUpdate({ userId: riderId }, { $inc: { totalRides: -1, totalCanceled: 1 } }, { new: true, session });
            if (!riderUpdate) {
                throw new AppError_1.AppError(500, "Failed to update rider statistics");
            }
        }
        yield session.commitTransaction();
        session.endSession();
        return "";
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.rideServices = { createRide, cancelRide };
