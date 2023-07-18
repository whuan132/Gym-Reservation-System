"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewByTrainerIdById = exports.updateReviewByTrainerIdById = exports.addReviewByTrainerId = exports.getReviewsByTrainerId = exports.deleteTrainerById = exports.updateTrainerById = exports.getTrainerById = exports.addTrainer = exports.getTrainers = void 0;
const trainer_model_1 = __importDefault(require("../models/trainer.model"));
const mongoose_1 = require("mongoose");
const getTrainers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const [page, page_size, query_key] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
            req.query.query_key || "",
        ];
        const result = yield trainer_model_1.default
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
                totalCount: ((_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.totalCount) || 0,
                totalPage: ((_b = result === null || result === void 0 ? void 0 : result[0]) === null || _b === void 0 ? void 0 : _b.totalPage) || 1,
                data: ((_c = result === null || result === void 0 ? void 0 : result[0]) === null || _c === void 0 ? void 0 : _c.data) || [],
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getTrainers = getTrainers;
const addTrainer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, image, specialization } = req.body;
        const obj = {
            _id: new mongoose_1.Types.ObjectId(),
            name,
            email,
            image,
            specialization,
        };
        yield trainer_model_1.default.create(obj);
        res.json({ success: true, data: obj._id.toString() });
    }
    catch (err) {
        next(err);
    }
});
exports.addTrainer = addTrainer;
const getTrainerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trainer_model_1.default
            .findOne({
            _id: req.params.trainer_id,
        }, { reviews: 0, __v: 0 })
            .lean();
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getTrainerById = getTrainerById;
const updateTrainerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, specialization, email, image } = req.body;
        const obj = {};
        if (name)
            obj.name = name;
        if (email)
            obj.email = email;
        if (image)
            obj.image = image;
        if (specialization)
            obj.specialization = specialization;
        const result = yield trainer_model_1.default.updateOne({
            _id: req.params.trainer_id,
        }, { $set: obj });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.updateTrainerById = updateTrainerById;
const deleteTrainerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield trainer_model_1.default.deleteOne({
            _id: req.params.trainer_id,
        });
        res.json({ success: true, data: result.deletedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTrainerById = deleteTrainerById;
const getReviewsByTrainerId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const [page, page_size] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
        ];
        const result = yield trainer_model_1.default
            .aggregate([
            { $match: { _id: new mongoose_1.Types.ObjectId(req.params.trainer_id) } },
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
                totalCount: ((_d = result === null || result === void 0 ? void 0 : result[0]) === null || _d === void 0 ? void 0 : _d.totalCount) || 0,
                totalPage: ((_e = result === null || result === void 0 ? void 0 : result[0]) === null || _e === void 0 ? void 0 : _e.totalPage) || 1,
                data: ((_f = result === null || result === void 0 ? void 0 : result[0]) === null || _f === void 0 ? void 0 : _f.data) || [],
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getReviewsByTrainerId = getReviewsByTrainerId;
const addReviewByTrainerId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const { rating, comment, tokenData } = req.body;
        const obj = {
            _id: new mongoose_1.Types.ObjectId(),
            rating: rating || 1,
            comment: comment || "default comment",
            createdBy: {
                id: tokenData._id,
                name: tokenData.name,
                email: tokenData.email,
            },
        };
        // Find the class and calculate the average rating
        const result = yield trainer_model_1.default.aggregate([
            { $match: { _id: new mongoose_1.Types.ObjectId(req.params.trainer_id) } },
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
        yield trainer_model_1.default.updateOne({ _id: req.params.trainer_id }, { $push: { reviews: obj }, $set: { rating: (_g = result === null || result === void 0 ? void 0 : result[0]) === null || _g === void 0 ? void 0 : _g.averageRating } });
        res.json({ success: true, data: obj._id.toString() });
    }
    catch (err) {
        next(err);
    }
});
exports.addReviewByTrainerId = addReviewByTrainerId;
const updateReviewByTrainerIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenData, rating, comment } = req.body;
        const obj = {};
        if (rating)
            obj["reviews.$.rating"] = rating;
        if (comment)
            obj["reviews.$.comment"] = comment;
        const result = yield trainer_model_1.default.updateOne({
            _id: req.params.trainer_id,
            "reviews._id": req.params.review_id,
            "reviews.createdBy.id": tokenData._id,
        }, { $set: obj });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.updateReviewByTrainerIdById = updateReviewByTrainerIdById;
const deleteReviewByTrainerIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenData } = req.body;
        const filter = {
            _id: req.params.trainer_id,
            "reviews._id": req.params.review_id,
        };
        if (tokenData.role !== "admin") {
            filter["reviews.createdBy.id"] = tokenData._id;
        }
        const result = yield trainer_model_1.default.updateOne(filter, {
            $pull: { reviews: { _id: req.params.review_id } },
        });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteReviewByTrainerIdById = deleteReviewByTrainerIdById;
