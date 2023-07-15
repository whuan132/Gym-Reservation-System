import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import gymClassModel, { IGymClass } from "../models/gym-class.model";
import { TokenData } from "../types/TokenData";
import { Types } from "mongoose";

export const getReservations: RequestHandler<
  {},
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: IGymClass[];
  }>,
  { tokenData: TokenData },
  { page: string; page_size: string }
> = async (req, res, next) => {
  try {
    const { tokenData } = req.body;
    const [page, page_size] = [
      parseInt(req.query.page || "1"),
      parseInt(req.query.page_size || "10"),
    ];
    const result = await gymClassModel
      .aggregate([
        { $match: { "reservations.email": tokenData.email } },
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
export const addReservation: RequestHandler<
  { gymclass_id: string },
  DataResponse<string>,
  { name: string; email: string } & TokenData
> = async (req, res, next) => {
  try {
    const new_reservation = {
      _id: new Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
    };
    const results = await gymClassModel.updateOne(
      {
        _id: req.params.gymclass_id,
      },
      { $push: { reservations: new_reservation } },
    );
    // console.log("results：" + JSON.stringify(results));
    res.json({ success: true, data: new_reservation._id.toString() });
  } catch (error) {
    next(error);
  }
};
