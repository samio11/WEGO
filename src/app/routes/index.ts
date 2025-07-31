import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { rideRoutes } from "../modules/ride/ride.routes";
import { driverRoutes } from "../modules/driver/driver.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

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
  {
    path: "/ride",
    element: rideRoutes,
  },
  {
    path: "/driver",
    element: driverRoutes,
  },
  {
    path: "/admin",
    element: adminRoutes,
  },
];

moduleRoutes.forEach((x) => rootRouter.use(x.path, x.element));
