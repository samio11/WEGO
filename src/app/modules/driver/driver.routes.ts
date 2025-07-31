import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interfaces";
import { driverControllers } from "./driver.controller";

const router = Router();

router.post(
  "/accept-ride",
  checkAuth(ERole.DRIVER),
  driverControllers.acceptRide
);
router.post(
  "/pickedUp-ride",
  checkAuth(ERole.DRIVER),
  driverControllers.picked_upRide
);
router.post(
  "/inTransmit-ride",
  checkAuth(ERole.DRIVER),
  driverControllers.in_transit_ride
);
router.post(
  "/complete-ride",
  checkAuth(ERole.DRIVER),
  driverControllers.completed_ride
);
router.get(
  "/view-earning",
  checkAuth(ERole.DRIVER),
  driverControllers.viewEarning
);
router.patch(
  "/update-available",
  checkAuth(ERole.DRIVER),
  driverControllers.updateAvailable
);

export const driverRoutes = router;
