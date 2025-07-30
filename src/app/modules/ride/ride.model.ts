import { model, Schema } from "mongoose";
import { ERideStatus, TRide, TStatusHistory } from "./ride.interface";
import { locationSchema } from "../driver/driver.model";

function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const statusHistorySchema = new Schema<TStatusHistory>({
  status: { type: String, enum: Object.values(ERideStatus) },
  time: { type: Date, default: Date.now() },
});

const rideSchema = new Schema<TRide>({
  riderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  driverId: { type: Schema.Types.ObjectId, ref: "User", default: null },
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

export const Ride = model<TRide>("Ride", rideSchema);
