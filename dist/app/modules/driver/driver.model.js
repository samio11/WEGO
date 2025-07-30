"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.locationSchema = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
const vehicleInfoSchema = new mongoose_1.Schema({
    vehicleType: { type: String, enum: Object.values(driver_interface_1.EVehicleType) },
    licensePlate: { type: String, required: true, unique: true },
});
exports.locationSchema = new mongoose_1.Schema({
    lat: { type: Number },
    lng: { type: Number },
});
const driverSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    vehicleInfo: { type: vehicleInfoSchema },
    isApproved: { type: Boolean, default: false },
    isAvailable: {
        type: String,
        enum: Object.values(driver_interface_1.EAvailable),
        default: driver_interface_1.EAvailable.ONLINE,
    },
    currentLocation: { type: exports.locationSchema },
    earning: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
