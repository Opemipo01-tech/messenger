import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getUsers, getUser } from "../controllers/userController.js";

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

export default userRouter;