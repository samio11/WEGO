import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { validateToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { Driver } from "../modules/driver/driver.model";
import { ERole } from "../modules/user/user.interfaces";
import { EAvailable } from "../modules/driver/driver.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(404, "Token Is Not Found!!!");
      }

      const verifyAccessToken = validateToken(
        accessToken,
        config.JWT_ACCESS_TOKEN as string
      ) as JwtPayload;

      const existUser = await User.findOne({ email: verifyAccessToken.email });
      if (!existUser) {
        throw new AppError(404, "User is Not found!!!");
      }

      if (existUser.isBlocked === true) {
        throw new AppError(401, "User is Blocked");
      }

      if (existUser.role === (ERole.DRIVER as string)) {
        const existDriver = await Driver.findOne({ userId: existUser?._id });
        if (!existDriver) {
          throw new AppError(401, "Driver is Not exists");
        }
        if (
          existDriver.isApproved === false ||
          existDriver.isAvailable === (EAvailable.OFFLINE as string)
        ) {
          throw new AppError(401, "This Driver Is not Allowed!!!");
        }
      }

      if (!authRoles.includes(verifyAccessToken.role)) {
        throw new AppError(401, "Access Denied!!!");
      }
      req.user = verifyAccessToken;
      next();
    } catch (err) {
      next(err);
    }
  };
