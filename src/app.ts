import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { rootRouter } from "./app/routes";
import "./app/config/passport";
import config from "./app/config";
const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.FRONTEND_URL as string,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running successful" });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
