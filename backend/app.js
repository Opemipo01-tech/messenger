import express from "express";
import cors from "cors";
import passport from "./passport/passport.js";
import authRoutes from "./routes/authRouter.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
  })
);

app.use(express.json());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.get("/",(req,res)=> {
    res.send("hi")
})

const PORT = 3000;

app.listen(PORT,() => {
    console.log("Running...")
})

export default app;