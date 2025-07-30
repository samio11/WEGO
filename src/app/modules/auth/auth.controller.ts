import passport from "passport";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../errors/AppError";
import { createUserToken } from "../../utils/userToken";
import { setCookie } from "../../utils/setCookie";
import { sendResponse } from "../../utils/sendResponse";
import config from "../../config";

const credentialLogin = catchAsync(async (req, res, next) => {
  passport.authenticate("local", async (err: any, user: any, info: any) => {
    if (err) {
      return next(new AppError(401, `Error:-${err}`));
    }
    if (!user) {
      return next(new AppError(401, info.message));
    }
    const userToken = await createUserToken(user);
    const { password: pass, ...rest } = user.toObject();
    setCookie(res, userToken);
    sendResponse(res, {
      success: true,
      message: "Login Done!!!",
      statusCode: 200,
      data: {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        userData: rest,
      },
    });
  })(req, res, next);
});

const googleCallback = catchAsync(async (req, res, next) => {
  const user = req?.user;
  if (!user) {
    throw new AppError(401, "User Not Found");
  }
  const userToken = await createUserToken(user);
  setCookie(res, userToken);
  res.redirect(`${config.FRONTEND_URL}`);
});

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logout Done!!!",
    data: "",
  });
});

export const authController = { credentialLogin, logout, googleCallback };
