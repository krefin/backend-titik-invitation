import prisma from "../../config/prisma.js";
import { comparePassword } from "../../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../../utils/jwt.js";

export const login = async ({ email, password }) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  // ❗ jangan kasih tau mana yang salah
  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(password, admin.password);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: admin.id,
    email: admin.email,
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // simpan refresh token ke DB
  await prisma.token.create({
    data: {
      token: refreshToken,
      adminId: admin.id,
    },
  });

  return {
    accessToken,
    refreshToken,
    admin: payload,
  };
};
export const logout = async (refreshToken) => {
  await prisma.token.deleteMany({
    where: { token: refreshToken },
  });
};