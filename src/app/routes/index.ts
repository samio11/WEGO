import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

export const rootRouter = Router();

const moduleRoutes = [
  {
    path: "/user",
    element: userRoutes,
  },
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));
