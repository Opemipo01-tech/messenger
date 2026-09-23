import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getUsers, getUser,updateProfile } from "../controllers/userController.js";
import { validateProfileUpdate } from "../middleware/validateProfileUpdate.js";

const userRouter = Router();

userRouter.get(
  "/",
  authenticate,
  getUsers
);

userRouter.get(
  "/:id",
  authenticate,
  getUser
);
userRouter.patch("/profile",authenticate,validateProfileUpdate,updateProfile);

export default userRouter;