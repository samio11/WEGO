import { Types } from "mongoose";
import { ERole } from "../user/user.interfaces";

export type TRider = {
  userId: Types.ObjectId;
  totalRides?: number;
  totalCanceled?: number;
};
