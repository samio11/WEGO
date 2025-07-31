import { AppError } from "../../errors/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Driver } from "../driver/driver.model";
import { User } from "../user/user.model";
import { UserSearch } from "./SearchField.contant";

const viewAllUser = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query)
    .filter()
    .search(UserSearch)
    .fields()
    .sort()
    .paginate();
  const result = await queryBuilder.build();
  return result;
};

const updateDriverStatus = async (driverId: string, payload: boolean) => {
  const existUser = await User.findById(driverId);
  if (!existUser) {
    throw new AppError(404, "User is Not Exist");
  }
  const updatedDriver = await Driver.findOneAndUpdate(
    { userId: driverId },
    { isApproved: payload },
    { new: true }
  );
  return updatedDriver;
};

export const adminServices = { viewAllUser, updateDriverStatus };
