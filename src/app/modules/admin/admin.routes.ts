import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ERole } from "../user/user.interfaces";
import { adminController } from "./admin.controller";

const router = Router();
router.get("/view-all", checkAuth(ERole.ADMIN), adminController.viewAllUser);
router.patch(
  "/updateStatus/:driverId",
  checkAuth(ERole.ADMIN),
  adminController.updateDriverStatus1
);
router.patch(
  "/block-user/:userId",
  checkAuth(ERole.ADMIN),
  adminController.admin_updateUserBlocked
);
router.patch(
  "/unBlock-user/:userId",
  checkAuth(ERole.ADMIN),
  adminController.admin_updateUserUnBlocked
);

export const adminRoutes = router;
