import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";
import ENV from "../config/env";

interface Body {
  name?: string;
  email: string;
  password: string;
}

export async function registerService(body: Body) {
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10); // hash password

  //check if email already exist
  const isEmailExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isEmailExist) {
    throw new AppError("User already exists", 409);
  }

  const register = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
      role: "Author",
    },
  });
  return {
    id: register.id,
    name: register.name,
    email: register.email,
    role: register.role,
    bio: register.bio,
    avatarUrl: register.avatarUrl,
    createdAt: register.createdAt,
  };
}

export async function loginService(body: Body) {
  const findUserByEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  // check if the email is null
  if (findUserByEmail === null) {
    throw new AppError("Email or Password incorrect", 401);
  }

  const credentials = await bcrypt.compare(
    body.password,
    findUserByEmail.passwordHash,
  );

  if (!credentials) {
    throw new AppError("Email or Password incorrect", 401);
  }

  const payload = {
    userId: findUserByEmail.id,
    email: findUserByEmail.email,
    role: findUserByEmail.role,
  };
  const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });

  // Hash refresh token
  const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

  // store in the refresh token table
  await prisma.refreshToken.create({
    data: {
      tokenHash: hashRefreshToken,
      userId: findUserByEmail.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
}
