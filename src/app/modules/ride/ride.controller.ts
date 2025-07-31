import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rideServices } from "./rider.services";
import { validateToken } from "../../utils/jwt";
import config from "../../config";

const createRide = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await rideServices.createRide(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Ride Created Done",
    data: result,
  });
});

const cancelRide = catchAsync(async (req, res, next) => {
  const { rideId } = req.params;
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;

  const result = await rideServices.cancelRide(rideId, verifyTokenInfo.userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Ride is Deleted!!!",
    data: "",
  });
});

const viewRides = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const accessToken = req?.headers?.authorization;
  const verifyTokenInfo = validateToken(
    accessToken as string,
    config.JWT_ACCESS_TOKEN as string
  ) as JwtPayload;
  const result = await rideServices.viewRides(
    verifyTokenInfo.userId,
    query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Getting Rider Data",
    data: result,
  });
});

export const rideController = { createRide, cancelRide, viewRides };
