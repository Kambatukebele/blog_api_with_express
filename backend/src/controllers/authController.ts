import { Request, Response } from "express";
import { RegisterValidator } from "../validators/authValidator";
import { registerService } from "../services/authService";

export async function register(req: Request, res: Response): Promise<Response> {
  const validatedReq = RegisterValidator.parseAsync(req.body);

  const registerData = await registerService(await validatedReq);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: registerData,
  });
}

export async function login(req: Request, res: Response) {}

export async function refresh(req: Request, res: Response) {}

export async function logout(req: Request, res: Response) {}

export async function me(req: Request, res: Response) {}
