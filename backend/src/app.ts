import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/api/health", (req: Request, res: Response) => {
  res.send("Api working");
});

// Error handler
app.use(errorHandler);

export default app;
