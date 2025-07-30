"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const driver_model_1 = require("../driver/driver.model");
const statusHistorySchema = new mongoose_1.Schema({
    status: { type: String, enum: Object.values(ride_interface_1.ERideStatus) },
    time: { type: Date, default: Date.now() },
});
const rideSchema = new mongoose_1.Schema({
    riderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: driver_model_1.locationSchema },
    destinationLocation: { type: driver_model_1.locationSchema },
    status: {
        type: String,
        enum: Object.values(ride_interface_1.ERideStatus),
        default: ride_interface_1.ERideStatus.requested,
    },
    fare: { type: Number, default: 0 },
    statusHistory: { type: [statusHistorySchema] },
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
