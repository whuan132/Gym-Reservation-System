import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import trainerModel, { ITrainer } from "../models/trainer.model";
import { Types } from "mongoose";
import { IReview } from "../models/review.schema";
import { TokenData } from "../types/TokenData";
import gymClassModel from "../models/gym-class.model";

export const getTrainers: RequestHandler<
  {},
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: ITrainer[];
  }>,
  {},
  { page: string; page_size: string; query_key: string }
> = async (req, res, next) => {
  try {
    const [page, page_size, query_key] = [
      parseInt(req.query.page || "1"),
      parseInt(req.query.page_size || "10"),
      req.query.query_key || "",
    ];
    const result = await trainerModel
      .aggregate([
        { $match: { name: { $regex: new RegExp(query_key, "i") } } },
        { $project: { reviews: 0, __v: 0 } },
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

export const addTrainer: RequestHandler<
  {},
  DataResponse<string>,
  ITrainer
> = async (req, res, next) => {
  try {
    const { name, email, image, specialization } = req.body;
    const obj = {
      _id: new Types.ObjectId(),
      name,
      email,
      image,
      specialization,
    };
    await trainerModel.create(obj);
    res.json({ success: true, data: obj._id.toString() });
  } catch (err) {
    next(err);
  }
};

export const getTrainerById: RequestHandler<
  { trainer_id: string },
  DataResponse<ITrainer>
> = async (req, res, next) => {
  try {
    const result = await trainerModel
      .findOne(
        {
          _id: req.params.trainer_id,
        },
        { reviews: 0, __v: 0 },
      )
      .lean();
    res.json({ success: true, data: result as ITrainer });
  } catch (err) {
    next(err);
  }
};

export const updateTrainerById: RequestHandler<
  { trainer_id: string },
  DataResponse<number>,
  ITrainer
> = async (req, res, next) => {
  try {
    const { name, specialization, email, image } = req.body;
    const obj = {} as any;
    if (name) obj.name = name;
    if (email) obj.email = email;
    if (image) obj.image = image;
    if (specialization) obj.specialization = specialization;

    const result = await trainerModel.updateOne(
      {
        _id: req.params.trainer_id,
      },
      { $set: obj },
    );

    // update class trainers
    if (name && result && result.modifiedCount > 0) {
      await gymClassModel.updateMany(
        { "trainers._id": req.params.trainer_id },
        { $set: { "trainers.$.name": name } },
      );
    }

    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteTrainerById: RequestHandler<
  { trainer_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
    const result = await trainerModel.deleteOne({
      _id: req.params.trainer_id,
    });
    // delete trainer on class
    if (result && result.deletedCount > 0) {
      await gymClassModel.updateMany(
        { "trainers._id": req.params.trainer_id },
        { $pull: { trainers: { _id: req.params.trainer_id } } },
      );
    }
    res.json({ success: true, data: result.deletedCount });
  } catch (err) {
    next(err);
  }
};

export const getReviewsByTrainerId: RequestHandler<
  { trainer_id: string },
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
    const result = await trainerModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(req.params.trainer_id) } },
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
              { $sort: { createdAt: -1 } },
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

export const addReviewByTrainerId: RequestHandler<
  { trainer_id: string },
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

    // Insert the new review
    await trainerModel.updateOne(
      { _id: req.params.trainer_id },
      {
        $push: { reviews: obj },
      },
    );

    // Find the class and calculate the average rating
    const result = await trainerModel.aggregate([
      { $match: { _id: new Types.ObjectId(req.params.trainer_id) } },
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

    // Update average rating
    await trainerModel.updateOne(
      { _id: req.params.trainer_id },
      {
        $set: { rating: result?.[0]?.averageRating },
      },
    );
    res.json({ success: true, data: obj._id.toString() });
  } catch (err) {
    next(err);
  }
};

export const updateReviewByTrainerIdById: RequestHandler<
  { trainer_id: string; review_id: string },
  DataResponse<number>,
  { tokenData: TokenData; rating: number; comment: string }
> = async (req, res, next) => {
  try {
    const { tokenData, rating, comment } = req.body;
    const obj = {} as any;
    if (rating) obj["reviews.$.rating"] = rating;
    if (comment) obj["reviews.$.comment"] = comment;
    const result = await trainerModel.updateOne(
      {
        _id: req.params.trainer_id,
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

export const deleteReviewByTrainerIdById: RequestHandler<
  { trainer_id: string; review_id: string },
  DataResponse<number>,
  { tokenData: TokenData }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    const filter = {
      _id: req.params.trainer_id,
      "reviews._id": req.params.review_id,
    } as any;
    if (tokenData.role !== "admin") {
      filter["reviews.createdBy.id"] = tokenData._id;
    }
    const result = await trainerModel.updateOne(filter, {
      $pull: { reviews: { _id: req.params.review_id } },
    });
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};
