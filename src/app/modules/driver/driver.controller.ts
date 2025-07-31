import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { validateToken } from "../../utils/jwt";
import config from "../../config";
import { driverServices } from "./driver.services";
import { sendResponse } from "../../utils/sendResponse";

const acceptRide = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;
  const rideId = req.body?.rideId;
  const driverId = verifyTokenInfo.userId;
  const payload = {
    rideId,
    driverId,
  };
  const result = await driverServices.acceptRide(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride Accepted",
    data: result,
  });
});
const picked_upRide = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;
  const rideId = req.body?.rideId;
  const driverId = verifyTokenInfo.userId;
  const payload = {
    rideId,
    driverId,
  };
  const result = await driverServices.pickedUpRide(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride Picked-UP",
    data: result,
  });
});
const in_transit_ride = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;
  const rideId = req.body?.rideId;
  const driverId = verifyTokenInfo.userId;
  const payload = {
    rideId,
    driverId,
  };
  const result = await driverServices.inTransmitRide(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride In-Transmit",
    data: result,
  });
});
const completed_ride = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;
  const rideId = req.body?.rideId;
  const driverId = verifyTokenInfo.userId;
  const payload = {
    rideId,
    driverId,
  };
  const result = await driverServices.completeRide(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ride Completed",
    data: result,
  });
});
const viewEarning = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;

  const driverId = verifyTokenInfo.userId;

  const result = await driverServices.viewEarning(driverId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Getting Driver Earning",
    data: result,
  });
});
const updateAvailable = catchAsync(async (req, res, next) => {
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;

  const driverId = verifyTokenInfo.userId;
  const payload = req.body.isAvailable;

  const result = await driverServices.updateAvailable(driverId, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Driver Available Updated!!!",
    data: result,
  });
});

export const driverControllers = {
  acceptRide,
  picked_upRide,
  in_transit_ride,
  completed_ride,
  viewEarning,
  updateAvailable,
};
