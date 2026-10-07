import { Request, Response } from "express";
import { RegisterValidator, LoginValidator } from "../validators/authValidator";
import { registerService, loginService } from "../services/authService";

export async function register(req: Request, res: Response): Promise<Response> {
  const validatedReq = RegisterValidator.parseAsync(req.body);

  const registerData = await registerService(await validatedReq);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: registerData,
  });
}

export async function login(req: Request, res: Response): Promise<Response> {
  // Validate email
  const validatedReq = await LoginValidator.parseAsync(req.body);

  const logged = await loginService(validatedReq);

  return res.status(200).json({
    success: true,
    message: "User logged successfully",
    data: logged,
  });
}

export async function refresh(req: Request, res: Response) {}

export async function logout(req: Request, res: Response) {}

export async function me(req: Request, res: Response) {}
