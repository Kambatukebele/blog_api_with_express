import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "../src/routes/authRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Auth Routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.send("Api working");
});

// Error handler
app.use(errorHandler);

export default app;
