import { Router } from "express";
import {
  register,
  login,
  getMe,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getMe);

export default authRouter;