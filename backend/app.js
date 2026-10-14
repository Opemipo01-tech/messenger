import express from "express";
import cors from "cors";
import { createServer} from "node:http";
import { Server } from "socket.io";

import jwt from "jsonwebtoken"
import { prisma } from "./prisma_db/prisma.js";

import passport from "./passport/passport.js";
import authRoutes from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://messenger-alpha-black.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

// Make Socket.IO accessible from Express controllers.
app.set("io", io);

io.use(async(socket,next) => {
  const token = socket.handshake.auth?.token;

  if(!token) {
    return next(new Error("Authorization Required"))
  }

  try{
    const payload = jwt.verify(token,process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarUrl: true,
      },
  });

  if(!user){
    return next(new Error("User not found"));
  }

      // Store the authenticated user on this socket connection.
    socket.data.user = user;

    next();
    
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
})

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://messenger-alpha-black.vercel.app",
    ],
  })
);

app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/users",userRouter);
app.use("/api/messages",messageRouter);


io.on("connection", (socket) => {
  const user = socket.data.user;

  socket.join(`user:${user.id}`);

  console.log(`${user.username} connected`, socket.id);

  socket.on("disconnect", () => {
    console.log(`${user.username} disconnected`, socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;