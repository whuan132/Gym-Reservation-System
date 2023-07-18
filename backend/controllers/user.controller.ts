import { RequestHandler } from "express";
import { DataResponse } from "../types/DataResponse";
import userModel, { IUser } from "../models/user.model";

export const getUsers: RequestHandler<
  {},
  DataResponse<{
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    data: IUser[];
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
    const result = await userModel
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

export const getUserById: RequestHandler<
  { user_id: string },
  DataResponse<IUser>
> = async (req, res, next) => {
  try {
    const result = await userModel
      .findOne(
        {
          _id: req.params.user_id,
        },
        { reviews: 0, __v: 0 },
      )
      .lean();
    res.json({ success: true, data: result as IUser });
  } catch (err) {
    next(err);
  }
};

export const updateUserById: RequestHandler<
  { user_id: string },
  DataResponse<number>,
  IUser
> = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const obj = {} as any;
    if (name) obj.name = name;
    if (email) obj.email = email;
    if (role) obj.role = role;

    const result = await userModel.updateOne(
      {
        _id: req.params.user_id,
      },
      { $set: obj },
    );
    res.json({ success: true, data: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteUserById: RequestHandler<
  { user_id: string },
  DataResponse<number>
> = async (req, res, next) => {
  try {
    const result = await userModel.deleteOne({
      _id: req.params.user_id,
    });
    res.json({ success: true, data: result.deletedCount });
  } catch (err) {
    next(err);
  }
};
