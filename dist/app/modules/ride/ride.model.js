"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const driver_model_1 = require("../driver/driver.model");
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
const statusHistorySchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.values(ride_interface_1.ERideStatus),
        default: ride_interface_1.ERideStatus.requested,
    },
    time: { type: Date, default: Date.now() },
});
const rideSchema = new mongoose_1.Schema({
    riderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
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
rideSchema.pre("save", function (next) {
    if (this.pickupLocation && this.destinationLocation) {
        const { lat: lat1, lng: lon1 } = this.pickupLocation;
        const { lat: lat2, lng: lon2 } = this.destinationLocation;
        const distance = calculateDistanceKm(lat1, lon1, lat2, lon2);
        const farePerKm = 40;
        this.fare = Math.round(distance * farePerKm);
    }
    next();
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
