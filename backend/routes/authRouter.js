import { Router } from "express";
import {
  register,
  login,
  getMe,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

import { validateRegister,validateLogin } from "../middleware/validationMiddleware.js";

const authRouter = Router();

authRouter.post("/register",validateRegister, register);
authRouter.post("/login",validateLogin, login);
authRouter.get("/me", authenticate, getMe);

export default authRouter;