import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 12); // 12 = secure
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};