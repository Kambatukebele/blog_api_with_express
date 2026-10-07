import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    // const handleErrors = error;
    const issues = error.issues.map((issue) => {
      return {
        path: issue.path[0],
        message: issue.message,
      };
    });

    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: issues,
    });
  }

  // Handle Prisma's unique constraint
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "fail",
        message: "Email already exists",
      });
    }
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
}

export default errorHandler;
