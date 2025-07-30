import { Response } from "express";
import config from "../config";

type TToken = {
  accessToken: string;
  refreshToken: string;
};

export const setCookie = (res: Response, token: TToken) => {
  if (token.accessToken) {
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "none",
    });
  }
  if (token.refreshToken) {
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "none",
    });
  }
};
