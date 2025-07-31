import { AppError } from "../../errors/AppError";
import { ERideStatus } from "../ride/ride.interface";
import { Ride } from "../ride/ride.model";
import { User } from "../user/user.model";
import { TAcceptRide } from "./driver.interface";
import { Driver } from "./driver.model";

const acceptRide = async (payload: TAcceptRide) => {
  //   console.log(payload);
  const isRideExist = await Ride.findById(payload.rideId);
  if (!isRideExist) {
    throw new AppError(404, "Requested Ride Not Exists");
  }
  const isDriverExist = await User.findById(payload.driverId);
  if (!isDriverExist) {
    throw new AppError(404, "Driver is not exists");
  }
  if (isRideExist.status && isRideExist.status !== ERideStatus.requested) {
    throw new AppError(401, `The Ride is already ${isRideExist.status}`);
  }

  const newAcceptRide = await Ride.findByIdAndUpdate(
    payload.rideId,
    {
      driverId: payload.driverId,
      status: ERideStatus.accepted,
      statusHistory: [
        ...isRideExist.statusHistory,
        { status: ERideStatus.accepted, time: Date.now() },
      ],
    },
    { new: true }
  );
  return newAcceptRide;
};
const pickedUpRide = async (payload: TAcceptRide) => {
  const isRideExist = await Ride.findById(payload.rideId);
  if (!isRideExist) {
    throw new AppError(404, "Requested Ride Not Exists");
  }
  const isDriverExist = await User.findById(payload.driverId);
  if (!isDriverExist) {
    throw new AppError(404, "Driver is not exists");
  }
  if (isRideExist.status && isRideExist.status === ERideStatus.canceled) {
    throw new AppError(401, `The Ride is already ${isRideExist.status}`);
  }

  const newPickedUpRide = await Ride.findByIdAndUpdate(
    payload.rideId,
    {
      status: ERideStatus.picked_up,
      statusHistory: [
        ...isRideExist.statusHistory,
        { status: ERideStatus.picked_up, time: Date.now() },
      ],
    },
    { new: true }
  );
  return newPickedUpRide;
};
const inTransmitRide = async (payload: TAcceptRide) => {
  const isRideExist = await Ride.findById(payload.rideId);
  if (!isRideExist) {
    throw new AppError(404, "Requested Ride Not Exists");
  }
  const isDriverExist = await User.findById(payload.driverId);
  if (!isDriverExist) {
    throw new AppError(404, "Driver is not exists");
  }
  if (isRideExist.status && isRideExist.status === ERideStatus.canceled) {
    throw new AppError(401, `The Ride is already ${isRideExist.status}`);
  }

  const newInTransmitRide = await Ride.findByIdAndUpdate(
    payload.rideId,
    {
      status: ERideStatus.in_transit,
      statusHistory: [
        ...isRideExist.statusHistory,
        { status: ERideStatus.in_transit, time: Date.now() },
      ],
    },
    { new: true }
  );
  return newInTransmitRide;
};
const completeRide = async (payload: TAcceptRide) => {
  const session = await Ride.startSession();
  session.startTransaction();
  try {
    const isRideExist = await Ride.findById(payload.rideId);
    if (!isRideExist) {
      throw new AppError(404, "Requested Ride Not Exists");
    }
    const isDriverExist = await User.findById(payload.driverId);
    if (!isDriverExist) {
      throw new AppError(404, "Driver is not exists");
    }
    if (isRideExist.status && isRideExist.status === ERideStatus.canceled) {
      throw new AppError(401, `The Ride is already ${isRideExist.status}`);
    }

    const newInTransmitRide = await Ride.findByIdAndUpdate(
      payload.rideId,
      {
        status: ERideStatus.completed,
        statusHistory: [
          ...isRideExist.statusHistory,
          { status: ERideStatus.completed, time: Date.now() },
        ],
      },
      { new: true, session }
    );
    if (newInTransmitRide) {
      const updateDriverEarning = await Driver.findOneAndUpdate(
        { userId: payload.driverId },
        { $inc: { earning: +Number(isRideExist.fare) } },
        { new: true, session }
      );

      if (!updateDriverEarning) {
        throw new AppError(401, "Some Error on Updating Earning Of Driver");
      }
    }

    await session.commitTransaction();
    session.endSession();
    return newInTransmitRide;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const driverServices = {
  acceptRide,
  pickedUpRide,
  inTransmitRide,
  completeRide,
};
