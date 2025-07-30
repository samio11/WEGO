import { Admin } from "../admin/admin.model";
import { Driver } from "../driver/driver.model";
import { Rider } from "../rider/rider.model";
import { ERole } from "./user.interfaces";
import { User } from "./user.model";

const createRider = async (payload: any) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const newUser = await User.create(
      [
        {
          ...payload,
          role: ERole.RIDER,
        },
      ],
      { session }
    );
    const newRider = await Rider.create(
      [
        {
          userId: newUser[0]._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return newRider;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
const createAdmin = async (payload: any) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const newUser = await User.create(
      [
        {
          ...payload,
          role: ERole.ADMIN,
        },
      ],
      { session }
    );
    const newAdmin = await Admin.create(
      [
        {
          userId: newUser[0]._id,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
const createDriver = async (payload: any) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    const newUser = await User.create(
      [
        {
          ...payload,
          role: ERole.DRIVER,
        },
      ],
      { session }
    );
    const newDriver = await Driver.create(
      [
        {
          userId: newUser[0]._id,
          vehicleInfo: payload.vehicleInfo,
          currentLocation: payload.currentLocation,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return newDriver;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const userServices = { createRider, createAdmin, createDriver };
