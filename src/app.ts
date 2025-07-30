import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running successful" });
});

export default app;
