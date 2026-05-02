import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // 🔥 HANDLE VALIDATION ERROR
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  // default error
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};