import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { userController } from "./user.controller";

const router = Router();

router.post(
  "/create-rider",
  multerUpload.single("file"),
  userController.createRider
);
router.post(
  "/create-admin",
  multerUpload.single("file"),
  userController.createAdmin
);
router.post(
  "/create-driver",
  multerUpload.single("file"),
  userController.createDriver
);

export const userRoutes = router;
