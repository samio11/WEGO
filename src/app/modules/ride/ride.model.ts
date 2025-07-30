import { model, Schema } from "mongoose";
import { ERideStatus, TRide, TStatusHistory } from "./ride.interface";
import { locationSchema } from "../driver/driver.model";

const statusHistorySchema = new Schema<TStatusHistory>({
  status: { type: String, enum: Object.values(ERideStatus) },
  time: { type: Date, default: Date.now() },
});

const rideSchema = new Schema<TRide>({
  riderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: Schema.Types.ObjectId, ref: "User" },
  pickupLocation: { type: locationSchema },
  destinationLocation: { type: locationSchema },
  status: {
    type: String,
    enum: Object.values(ERideStatus),
    default: ERideStatus.requested,
  },
  fare: { type: Number, default: 0 },
  statusHistory: { type: [statusHistorySchema] },
});

export const Ride = model<TRide>("Ride", rideSchema);
