import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import gymClassModel, { IGymClass } from "../models/gym-class.model";
import { Types } from "mongoose";

export const getClasses: RequestHandler<{}, DataResponse<IGymClass[]>> = async (
  req,
  res,
  next,
) => {
  try {
    const results = await gymClassModel
      .find(
        {},
        {
          reviews: 0,
          trainers: 0,
          reservations: 0,
        },
      )
      .lean();
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

export const getClassById: RequestHandler<
  { class_id: string },
  DataResponse<IGymClass>
> = async (req, res, next) => {
  try {
    const result = await gymClassModel
      .findOne({ _id: req.params.class_id }, { reservations: 0 })
      .lean();
    res.json({ success: true, data: result as IGymClass });
  } catch (err) {
    next(err);
  }
};

export const addClass: RequestHandler<
  {},
  DataResponse<string>,
  IGymClass
> = async (req, res, next) => {
  try {
    const { name, description, capacity, start_date, end_date } = req.body;
    const obj = {
      name,
      description,
      capacity,
      start_date,
      end_date,
      _id: new Types.ObjectId(),
    };
    await gymClassModel.create(obj);
    res.json({ success: true, data: obj._id.toString() });
  } catch (err) {
    next(err);
  }
};

export const updateClassById: RequestHandler<
  { class_id: string },
  DataResponse<number>,
  IGymClass
> = async (req, res, next) => {
  try {
    const { name, description, capacity, start_date, end_date } = req.body;
    const updateObj = {} as IGymClass;
    if (name) updateObj.name = name;
    if (description) updateObj.description = description;
    if (capacity) updateObj.capacity = capacity;
    if (start_date) updateObj.start_date = start_date;
    if (end_date) updateObj.end_date = end_date;
    const result = await gymClassModel.updateOne(
      {
        _id: req.params.class_id,
      },
      {
        $set: updateObj,
      },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteClassById: RequestHandler<
  { class_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
    const result = await gymClassModel.deleteOne({ _id: req.params.class_id });
    res.json({ success: true, data: result.deletedCount });
  } catch (err) {
    next(err);
  }
};

export const addTrainer: RequestHandler<
  { class_id: string },
  DataResponse<string>,
  { trainer_id: string }
> = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const deleteTrainerById: RequestHandler<
  { class_id: string; trainer_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const addReview: RequestHandler<
  { class_id: string; rating: number; comment: string },
  DataResponse<string>
> = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const updateReviewById: RequestHandler<
  { class_id: string; review_id: string; rating: number; comment: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const deleteReviewById: RequestHandler<
  { class_id: string; review_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
