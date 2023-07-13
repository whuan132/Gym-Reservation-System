import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "../types/ErrorResponse";
import userModel from "../models/user.model";
import { TokenData } from "../types/TokenData";
import { Types } from "mongoose";

export const signup: RequestHandler<
  {},
  DataResponse<string>,
  { email: string; name: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email) {
      throw new ErrorResponse(`Invalid email`, 401);
    }
    if (!password) {
      throw new ErrorResponse(`Invalid password`, 401);
    }
    const obj = {
      _id: new Types.ObjectId(),
      name,
      email: email.toLowerCase(),
      role: "customer",
    };
    // duplicate email
    const exist = await userModel.findOne({ email: obj.email, role: obj.role });
    if (exist) {
      throw new ErrorResponse("Duplicate email", 500);
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      ...obj,
      password: hashed_password,
    });
    if (result) {
      if (!process.env.JWT_PRIVATE_KEY) {
        throw new ErrorResponse("Could not sign token", 500);
      }
      const JWT = jwt.sign(obj, process.env.JWT_PRIVATE_KEY);
      res.json({ success: true, data: JWT });
      return;
    }
    throw new ErrorResponse(`Unknown error`, 401);
  } catch (err) {
    next(err);
  }
};

export const signin: RequestHandler<
  {},
  DataResponse<string>,
  { email: string; password: string; role: string }
> = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await userModel
      .findOne({ email: email.toLowerCase(), role: role || "customer" })
      .lean();
    if (!user) {
      throw new ErrorResponse(`Invalid email`, 401);
    }

    const match = await bcrypt.compare(password, user.password as string);
    if (!match) {
      throw new ErrorResponse(`Invalid password`, 401);
    }

    if (!process.env.JWT_PRIVATE_KEY) {
      throw new ErrorResponse("Could not sign token", 500);
    }
    const JWT = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      process.env.JWT_PRIVATE_KEY,
    );
    res.json({ success: true, data: JWT });
  } catch (err) {
    next(err);
  }
};

export const updatePassword: RequestHandler<
  {},
  DataResponse,
  { password: string; tokenData: TokenData }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    const { password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    const result = await userModel.updateOne(
      { email: tokenData.email, role: tokenData.role },
      { $set: { password: hashed_password } },
    );
    res.json({ success: !!result });
  } catch (err) {
    next(err);
  }
};
