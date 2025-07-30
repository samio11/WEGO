import { model, Schema } from "mongoose";
import {
  EAvailable,
  EVehicleType,
  TDriver,
  TLocation,
  TVehicleInfo,
} from "./driver.interface";
import { ERole } from "../user/user.interfaces";

const vehicleInfoSchema = new Schema<TVehicleInfo>({
  vehicleType: { type: String, enum: Object.values(EVehicleType) },
  licensePlate: { type: String, required: true, unique: true },
});

export const locationSchema = new Schema<TLocation>({
  lat: { type: Number },
  lng: { type: Number },
});

const driverSchema = new Schema<TDriver>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vehicleInfo: { type: vehicleInfoSchema },
    isApproved: { type: Boolean, default: false },
    isAvailable: {
      type: String,
      enum: Object.values(EAvailable),
      default: EAvailable.ONLINE,
    },
    currentLocation: { type: locationSchema },
    earning: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Driver = model<TDriver>("Driver", driverSchema);
