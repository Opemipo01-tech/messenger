import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";



const messageRouter = Router();

messageRouter.post(
  "/",
  authenticate,
  sendMessage
);

messageRouter.get(
  "/:userId",
  authenticate,
  getMessages
);

export default messageRouter;