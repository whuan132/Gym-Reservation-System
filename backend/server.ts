import express, { Request, Response } from "express";
import cors from "cors";
import ErrorResponse from "./types/ErrorResponse";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routers/auth.router";
import classesRouter from "./routers/gym-class.router";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// connect MongoDB
(async function () {
  try {
    if (process.env.DB_SERVER_URL) {
      await mongoose.connect(process.env.DB_SERVER_URL);
      console.log(`DB server connected successfully`);
    } else {
      console.log(`DB Server URL not found`);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/classes", classesRouter);

// Catch all unhandled requests
app.all("*", async (req, res, next) =>
  next(new ErrorResponse(`Route not found`, 404)),
);

// error handler
app.use((error: ErrorResponse, req: Request, res: Response) => {
  res.status(error.status || 500).json({ success: false, data: error.message });
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
