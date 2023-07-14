import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import gymClassModel, { IGymClass } from "../models/gym-class.model";
import { Types } from "mongoose";
import { IReview } from "../models/review.schema";
import { TokenData } from "../types/TokenData";
import { ITrainer } from "../models/trainer.model";
import { IReservation } from "../models/reservation.schema";
import ErrorResponse from "../types/ErrorResponse";

export const getClasses: RequestHandler<
  {},
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: IGymClass[];
  }>,
  {},
  { page: string; page_size: string }
> = async (req, res, next) => {
  try {
    const [page, page_size] = [
      parseInt(req.query.page || "1"),
      parseInt(req.query.page_size || "10"),
    ];
    const result = await gymClassModel
      .aggregate([
        { $match: {} },
        { $project: { reviews: 0, trainers: 0, reservations: 0, __v: 0 } },
        {
          $facet: {
            data: [
              { $match: {} },
              { $skip: (page - 1) * page_size },
              { $limit: page_size },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
        {
          $project: {
            data: 1,
            totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
            totalPages: {
              $ceil: {
                $divide: [
                  { $arrayElemAt: ["$totalCount.count", 0] },
                  page_size,
                ],
              },
            },
          },
        },
      ])
      .exec();
    res.json({
      success: true,
      data: {
        page: page,
        pageSize: page_size,
        totalCount: result?.[0]?.totalCount || 0,
        totalPage: result?.[0]?.totalPage || 1,
        data: result?.[0]?.data || [],
      },
    });
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
    const { name, description, capacity, startDate, endDate } = req.body;
    const obj = {
      name,
      description,
      capacity,
      startDate,
      endDate,
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
    const { name, description, capacity, startDate, endDate } = req.body;
    const updateObj = {} as IGymClass;
    if (name) updateObj.name = name;
    if (description) updateObj.description = description;
    if (capacity) updateObj.capacity = capacity;
    if (startDate) updateObj.startDate = startDate;
    if (endDate) updateObj.endDate = endDate;
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

export const getTrainers: RequestHandler<
  { class_id: string },
  DataResponse<ITrainer[]>
> = async (req, res, next) => {
  try {
    const result = await gymClassModel.findOne(
      { _id: req.params.class_id },
      { trainers: 1 },
    );
    res.json({ success: true, data: (result?.trainers || []) as ITrainer[] });
  } catch (err) {
    next(err);
  }
};

export const addTrainer: RequestHandler<
  { class_id: string },
  DataResponse<string>,
  { trainer_id: string; name: string }
> = async (req, res, next) => {
  try {
    const { trainer_id, name } = req.body;
    const obj = { _id: new Types.ObjectId(trainer_id), name: name };
    await gymClassModel.updateOne(
      {
        _id: req.params.class_id,
      },
      { $push: { trainers: obj } },
    );
    res.json({ success: true, data: obj._id.toString() });
  } catch (err) {
    next(err);
  }
};

export const deleteTrainerById: RequestHandler<
  { class_id: string; trainer_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
    const result = await gymClassModel.updateOne(
      { _id: req.params.class_id, "trainers._id": req.params.trainer_id },
      { $pull: { trainers: { _id: req.params.trainer_id } } },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const getReviews: RequestHandler<
  { class_id: string },
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: IReview[];
  }>,
  {},
  { page: string; page_size: string }
> = async (req, res, next) => {
  try {
    const [page, page_size] = [
      parseInt(req.query.page || "1"),
      parseInt(req.query.page_size || "10"),
    ];
    const result = await gymClassModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(req.params.class_id) } },
        { $project: { reviews: 1 } },
        { $unwind: "$reviews" },
        {
          $project: {
            _id: "$reviews._id",
            rating: "$reviews.rating",
            comment: "$reviews.comment",
            createdAt: "$reviews.createdAt",
            createdBy: "$reviews.createdBy",
          },
        },
        {
          $facet: {
            data: [
              { $match: {} },
              { $skip: (page - 1) * page_size },
              { $limit: page_size },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
        {
          $project: {
            data: 1,
            totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
            totalPages: {
              $ceil: {
                $divide: [
                  { $arrayElemAt: ["$totalCount.count", 0] },
                  page_size,
                ],
              },
            },
          },
        },
      ])
      .exec();
    res.json({
      success: true,
      data: {
        page: page,
        pageSize: page_size,
        totalCount: result?.[0]?.totalCount || 0,
        totalPage: result?.[0]?.totalPage || 1,
        data: result?.[0]?.data || [],
      },
    });
  } catch (err) {
    next(err);
  }
};

export const addReview: RequestHandler<
  { class_id: string },
  DataResponse<string>,
  { tokenData: TokenData; rating: number; comment: string }
> = async (req, res, next) => {
  try {
    const { rating, comment, tokenData } = req.body;
    const obj = {
      _id: new Types.ObjectId(),
      rating: rating || 1,
      comment: comment || "default comment",
      createdBy: {
        id: tokenData._id,
        name: tokenData.name,
        email: tokenData.email,
      },
    };

    // Find the class and calculate the average rating
    const result = await gymClassModel.aggregate([
      { $match: { _id: new Types.ObjectId(req.params.class_id) } },
      {
        $project: {
          _id: 0,
          averageRating: {
            $cond: [
              { $isArray: "$reviews" },
              {
                $avg: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: "$$review.rating",
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ]);

    // Update the class with the new review and average rating
    await gymClassModel.updateOne(
      { _id: req.params.class_id },
      { $push: { reviews: obj }, $set: { rating: result?.[0]?.averageRating } },
    );
    res.json({ success: true, data: obj._id.toString() });
  } catch (err) {
    next(err);
  }
};

export const updateReviewById: RequestHandler<
  { class_id: string; review_id: string },
  DataResponse<number>,
  { tokenData: TokenData; rating: number; comment: string }
> = async (req, res, next) => {
  try {
    const { tokenData, rating, comment } = req.body;
    const obj = {} as any;
    if (rating) obj["reviews.$.rating"] = rating;
    if (comment) obj["reviews.$.comment"] = comment;
    const result = await gymClassModel.updateOne(
      {
        _id: req.params.class_id,
        "reviews._id": req.params.review_id,
        "reviews.createdBy.id": tokenData._id,
      },
      { $set: obj },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteReviewById: RequestHandler<
  { class_id: string; review_id: string },
  DataResponse<number>,
  { tokenData: TokenData }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    const filter = {
      _id: req.params.class_id,
      "reviews._id": req.params.review_id,
    } as any;
    if (tokenData.role !== "admin") {
      filter["reviews.createdBy.id"] = tokenData._id;
    }
    const result = await gymClassModel.updateOne(filter, {
      $pull: { reviews: { _id: req.params.review_id } },
    });
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const getReservations: RequestHandler<
  {},
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: IReservation[];
  }>,
  {},
  { page: string; page_size: string }
> = async (req, res, next) => {
  try {
    const [page, page_size] = [
      parseInt(req.query.page || "1"),
      parseInt(req.query.page_size || "10"),
    ];
    const result = await gymClassModel
      .aggregate([
        { $match: {} },
        { $project: { reservations: 1 } },
        { $unwind: "$reservations" },
        {
          $project: {
            _id: "$reservations._id",
            name: "$reservations.name",
            email: "$reservations.email",
          },
        },
        {
          $facet: {
            data: [
              { $match: {} },
              { $skip: (page - 1) * page_size },
              { $limit: page_size },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
        {
          $project: {
            data: 1,
            totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
            totalPages: {
              $ceil: {
                $divide: [
                  { $arrayElemAt: ["$totalCount.count", 0] },
                  page_size,
                ],
              },
            },
          },
        },
      ])
      .exec();
    res.json({
      success: true,
      data: {
        page: page,
        pageSize: page_size,
        totalCount: result?.[0]?.totalCount || 0,
        totalPage: result?.[0]?.totalPage || 1,
        data: result?.[0]?.data || [],
      },
    });
  } catch (err) {
    next(err);
  }
};

export const addReservation: RequestHandler<
  { class_id: string },
  DataResponse<number>,
  { tokenData: TokenData }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    const obj = {
      _id: tokenData._id,
      name: tokenData.name,
      email: tokenData.email,
    };

    // check if the customer has already booked
    const existingCustomer = await gymClassModel.findOne({
      _id: req.params.class_id,
      "reservations._id": tokenData._id,
    });
    if (existingCustomer) {
      throw new ErrorResponse("The customer has already booked", 500);
    }

    const result = await gymClassModel.updateOne(
      { _id: req.params.class_id },
      { $push: { reservations: obj } },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteReservationById: RequestHandler<
  { class_id: string; reservation_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
    const result = await gymClassModel.updateOne(
      {
        _id: req.params.class_id,
        "reservations._id": req.params.reservation_id,
      },
      {
        $pull: { reservations: { _id: req.params.reservation_id } },
      },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};
