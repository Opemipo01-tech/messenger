import express from "express";
import cors from "cors";
import passport from "./passport/passport.js";
import authRoutes from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

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


const PORT = 3000;

app.listen(PORT,() => {
    console.log("Running...")
})

export default app;