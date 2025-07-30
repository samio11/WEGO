import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createRider = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    profileImage: req?.file?.path,
  };
  const result = await userServices.createRider(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Rider is Created!!!",
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    profileImage: req?.file?.path,
  };
  const result = await userServices.createAdmin(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin is Created!!!",
    data: result,
  });
});
const createDriver = catchAsync(async (req, res, next) => {
  const payload = {
    ...JSON.parse(req?.body?.data),
    profileImage: req?.file?.path,
  };
  const result = await userServices.createDriver(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Driver is Created!!!",
    data: result,
  });
});

export const userController = { createRider, createAdmin, createDriver };
