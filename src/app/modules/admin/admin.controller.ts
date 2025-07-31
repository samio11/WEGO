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

export const adminController = { viewAllUser, updateDriverStatus1 };
