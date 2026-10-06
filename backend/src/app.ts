import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import AppError from "./errors/AppError";

const app = express();

app.get("/api/health", (req: Request, res: Response) => {
  res.send("Api working");
});

// Error handler
app.use(errorHandler);

export default app;
