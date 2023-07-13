import { RequestHandler } from "express";
import { TokenData } from "../types/TokenData";
import ErrorResponse from "../types/ErrorResponse";

export const checkAdmin: RequestHandler<
  {},
  {},
  { tokenData: TokenData }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    if (!tokenData || tokenData.role !== "admin") {
      throw new ErrorResponse(`You don't have permission`, 401);
    }
    next();
  } catch (e) {
    next(e);
  }
};
