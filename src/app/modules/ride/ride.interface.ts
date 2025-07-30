import { Types } from "mongoose";
import { TLocation } from "../driver/driver.interface";

export enum ERideStatus {
  requested = "requested",
  accepted = "accepted",
  picked_up = "picked_up",
  in_transit = "in_transit",
  completed = "completed",
  canceled = "canceled",
}

export type TStatusHistory = {
  status: ERideStatus;
  time: Date;
};
export type TRide = {
  riderId: Types.ObjectId;
  driverId: Types.ObjectId;
  pickupLocation: TLocation;
  destinationLocation: TLocation;
  status: ERideStatus;
  fare: number;
  statusHistory: TStatusHistory[];
};
