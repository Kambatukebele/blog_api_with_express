// Standard error for errors that the application intentionally generates
class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default AppError;
