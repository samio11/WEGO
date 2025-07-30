import { AppError } from "../../errors/AppError";
import { Rider } from "../rider/rider.model";
import { ERideStatus, TRide } from "./ride.interface";
import { Ride } from "./ride.model";

const createRide = async (payload: TRide) => {
  const session = await Ride.startSession();
  session.startTransaction();
  try {
    const existRider = await Rider.findOne({ userId: payload.riderId });
    if (!existRider) {
      throw new AppError(404, "Rider is Not Found");
    }
    const newRide = await Ride.create([{ ...payload }], { session });
    if (newRide) {
      await Rider.findOneAndUpdate(
        { userId: payload.riderId },
        { $inc: { totalRides: +1 } },
        { new: true, session }
      );
    }
    await session.commitTransaction();
    session.endSession();
    return newRide;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const cancelRide = async (payload: string, riderId: string) => {
  const session = await Ride.startSession();
  session.startTransaction();
  try {
    const existRide = await Ride.findById(payload);
    if (!existRide) {
      throw new AppError(404, "Ride is not exists!!!");
    }
    if (existRide.riderId.toString() !== riderId) {
      throw new AppError(401, "This Rider cant cancel Ride");
    }
    if (existRide.status === ERideStatus.requested) {
      throw new AppError(
        401,
        "You Cant Cancel,Please wait for Accept Approval"
      );
    }

    await Ride.findByIdAndUpdate(
      payload,
      { status: ERideStatus.canceled },
      { new: true, session }
    );

    await Rider.findOneAndUpdate(
      { userId: existRide.riderId },
      { $inc: { totalRides: -1 } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return "";
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const rideServices = { createRide, cancelRide };
