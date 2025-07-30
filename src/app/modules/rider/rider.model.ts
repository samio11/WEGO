import { model, Schema } from "mongoose";
import { TRider } from "./rider.interface";
import { ERole } from "../user/user.interfaces";

const riderSchema = new Schema<TRider>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    totalRides: { type: Number, default: 0 },
    totalCanceled: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Rider = model<TRider>("Rider", riderSchema);
