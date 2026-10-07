import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import AppError from "../errors/AppError";

type Body = {
  name: string;
  email: string;
  password: string;
};

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
