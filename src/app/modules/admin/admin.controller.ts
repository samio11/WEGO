import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminServices } from "./admin.services";

const viewAllUser = catchAsync(async (req, res, next) => {
  const query = req?.query;
  const result = await adminServices.viewAllUser(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All User Getting Done",
    data: result,
  });
});
const updateDriverStatus1 = catchAsync(async (req, res, next) => {
  const driverId = req.params.driverId;
  const { isApproved } = req.body;
  const result = await adminServices.updateDriverStatus(driverId, isApproved);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Driver Status Updated",
    data: result,
  });
});
const admin_updateUserBlocked = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const result = await adminServices.updateUserBlocked(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Is Blocked",
    data: result,
  });
});
const admin_updateUserUnBlocked = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const result = await adminServices.updateUserUnBlocked(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Is Blocked",
    data: result,
  });
});

export const adminController = {
  viewAllUser,
  updateDriverStatus1,
  admin_updateUserBlocked,
  admin_updateUserUnBlocked,
};
