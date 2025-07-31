import { Types } from "mongoose";
import { ERole } from "../user/user.interfaces";

export enum EVehicleType {
  Car = "Car",
  Bike = "Bike",
}

export enum EAvailable {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TVehicleInfo = {
  vehicleType: EVehicleType;
  licensePlate: string;
};
export type TLocation = {
  lat: number;
  lng: number;
};
export type TDriver = {
  userId: Types.ObjectId;
  vehicleInfo: TVehicleInfo;
  isApproved: boolean;
  isAvailable: EAvailable;
  currentLocation?: TLocation;
  earning: number;
};

export type TAcceptRide = {
  rideId: string;
  driverId: string;
};
