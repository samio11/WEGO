import config from "../config";
import { TUser } from "../modules/user/user.interfaces";
import { generateToken } from "./jwt";

export const createUserToken = (userData: Partial<TUser>) => {
  const payload = {
    userId: userData._id,
    email: userData.email,
    role: userData.role,
  };
  const accessToken = generateToken(
    payload,
    config.JWT_ACCESS_TOKEN as string,
    config.JWT_ACCESS_EXPIRES as string
  );
  const refreshToken = generateToken(
    payload,
    config.JWT_REFRESH_TOKEN as string,
    config.JWT_REFRESH_EXPIRES as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
