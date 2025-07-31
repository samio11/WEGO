import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interfaces";
import { rideController } from "./ride.controller";

const router = Router();

router.post("/create-ride", checkAuth(ERole.RIDER), rideController.createRide);
router.get("/view-ride", checkAuth(ERole.RIDER), rideController.viewRides);
router.post(
  "/cancel-ride/:rideId",
  checkAuth(ERole.RIDER),
  rideController.cancelRide
);

export const rideRoutes = router;
