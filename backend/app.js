import express from "express";
import cors from "cors";
import { createServer} from "node:http";
import { Server } from "socket.io";


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
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;