import { Response, Request, NextFunction } from "express";
import z from "zod";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";

const registerUser = z.object({
  username: z.string().min(4).max(100),
  email: z.string().email(),
  password: z.string(),
  sessionExpiresAt: z.date().optional()
});

const loginUser = z.object({
  email: z.string().email(),
  password: z.string(),
})

const registerUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = registerUser.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "validate user error!", result.error.errors);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const loginUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = loginUser.safeParse(req.body);

    if (!result.success) {
      throw new ApiError(400, "validate user error!", result.error.errors);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { 
  registerUsers,
  loginUsers
};
