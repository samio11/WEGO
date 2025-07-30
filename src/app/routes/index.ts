import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const rootRouter = Router();

const moduleRoutes = [
  {
    path: "/user",
    element: userRoutes,
  },
  {
    path: "/auth",
    element: authRoutes,
  },
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));
