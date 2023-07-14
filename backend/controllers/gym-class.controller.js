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
exports.deleteReservationByClassIdById = exports.addReservationByClassId = exports.getReservationsByClassId = exports.deleteReviewByClassIdById = exports.updateReviewByClassIdById = exports.addReviewByClassId = exports.getReviewsByClassId = exports.deleteTrainerByClassIdById = exports.addTrainerByClassId = exports.getTrainersByClassId = exports.deleteClassById = exports.updateClassById = exports.addClass = exports.getClassById = exports.getClasses = void 0;
const gym_class_model_1 = __importDefault(require("../models/gym-class.model"));
const mongoose_1 = require("mongoose");
const ErrorResponse_1 = __importDefault(require("../types/ErrorResponse"));
const getClasses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const [page, page_size] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
        ];
        const result = yield gym_class_model_1.default
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
exports.getClasses = getClasses;
const getClassById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield gym_class_model_1.default
            .findOne({ _id: req.params.class_id }, { reservations: 0 })
            .lean();
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getClassById = getClassById;
const addClass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, capacity, startDate, endDate } = req.body;
        const obj = {
            name,
            description,
            capacity,
            startDate,
            endDate,
            _id: new mongoose_1.Types.ObjectId(),
        };
        yield gym_class_model_1.default.create(obj);
        res.json({ success: true, data: obj._id.toString() });
    }
    catch (err) {
        next(err);
    }
});
exports.addClass = addClass;
const updateClassById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, capacity, startDate, endDate } = req.body;
        const updateObj = {};
        if (name)
            updateObj.name = name;
        if (description)
            updateObj.description = description;
        if (capacity)
            updateObj.capacity = capacity;
        if (startDate)
            updateObj.startDate = startDate;
        if (endDate)
            updateObj.endDate = endDate;
        const result = yield gym_class_model_1.default.updateOne({
            _id: req.params.class_id,
        }, {
            $set: updateObj,
        });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.updateClassById = updateClassById;
const deleteClassById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield gym_class_model_1.default.deleteOne({ _id: req.params.class_id });
        res.json({ success: true, data: result.deletedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteClassById = deleteClassById;
const getTrainersByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield gym_class_model_1.default.findOne({ _id: req.params.class_id }, { trainers: 1 });
        res.json({ success: true, data: ((result === null || result === void 0 ? void 0 : result.trainers) || []) });
    }
    catch (err) {
        next(err);
    }
});
exports.getTrainersByClassId = getTrainersByClassId;
const addTrainerByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trainer_id, name } = req.body;
        const obj = { _id: new mongoose_1.Types.ObjectId(trainer_id), name: name };
        yield gym_class_model_1.default.updateOne({
            _id: req.params.class_id,
        }, { $push: { trainers: obj } });
        res.json({ success: true, data: obj._id.toString() });
    }
    catch (err) {
        next(err);
    }
});
exports.addTrainerByClassId = addTrainerByClassId;
const deleteTrainerByClassIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield gym_class_model_1.default.updateOne({ _id: req.params.class_id, "trainers._id": req.params.trainer_id }, { $pull: { trainers: { _id: req.params.trainer_id } } });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTrainerByClassIdById = deleteTrainerByClassIdById;
const getReviewsByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const [page, page_size] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
        ];
        const result = yield gym_class_model_1.default
            .aggregate([
            { $match: { _id: new mongoose_1.Types.ObjectId(req.params.class_id) } },
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
exports.getReviewsByClassId = getReviewsByClassId;
const addReviewByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield gym_class_model_1.default.aggregate([
            { $match: { _id: new mongoose_1.Types.ObjectId(req.params.class_id) } },
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
        yield gym_class_model_1.default.updateOne({ _id: req.params.class_id }, { $push: { reviews: obj }, $set: { rating: (_g = result === null || result === void 0 ? void 0 : result[0]) === null || _g === void 0 ? void 0 : _g.averageRating } });
        res.json({ success: true, data: obj._id.toString() });
    }
    catch (err) {
        next(err);
    }
});
exports.addReviewByClassId = addReviewByClassId;
const updateReviewByClassIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenData, rating, comment } = req.body;
        const obj = {};
        if (rating)
            obj["reviews.$.rating"] = rating;
        if (comment)
            obj["reviews.$.comment"] = comment;
        const result = yield gym_class_model_1.default.updateOne({
            _id: req.params.class_id,
            "reviews._id": req.params.review_id,
            "reviews.createdBy.id": tokenData._id,
        }, { $set: obj });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.updateReviewByClassIdById = updateReviewByClassIdById;
const deleteReviewByClassIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenData } = req.body;
        const filter = {
            _id: req.params.class_id,
            "reviews._id": req.params.review_id,
        };
        if (tokenData.role !== "admin") {
            filter["reviews.createdBy.id"] = tokenData._id;
        }
        const result = yield gym_class_model_1.default.updateOne(filter, {
            $pull: { reviews: { _id: req.params.review_id } },
        });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteReviewByClassIdById = deleteReviewByClassIdById;
const getReservationsByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    try {
        const [page, page_size] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
        ];
        const result = yield gym_class_model_1.default
            .aggregate([
            { $match: { _id: new mongoose_1.Types.ObjectId(req.params.class_id) } },
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
                totalCount: ((_h = result === null || result === void 0 ? void 0 : result[0]) === null || _h === void 0 ? void 0 : _h.totalCount) || 0,
                totalPage: ((_j = result === null || result === void 0 ? void 0 : result[0]) === null || _j === void 0 ? void 0 : _j.totalPage) || 1,
                data: ((_k = result === null || result === void 0 ? void 0 : result[0]) === null || _k === void 0 ? void 0 : _k.data) || [],
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getReservationsByClassId = getReservationsByClassId;
const addReservationByClassId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenData } = req.body;
        const obj = {
            _id: tokenData._id,
            name: tokenData.name,
            email: tokenData.email,
        };
        // check if the customer has already booked
        const existingCustomer = yield gym_class_model_1.default.findOne({
            _id: req.params.class_id,
            "reservations._id": tokenData._id,
        });
        if (existingCustomer) {
            throw new ErrorResponse_1.default("The customer has already booked", 500);
        }
        const result = yield gym_class_model_1.default.updateOne({ _id: req.params.class_id }, { $push: { reservations: obj } });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.addReservationByClassId = addReservationByClassId;
const deleteReservationByClassIdById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield gym_class_model_1.default.updateOne({
            _id: req.params.class_id,
            "reservations._id": req.params.reservation_id,
        }, {
            $pull: { reservations: { _id: req.params.reservation_id } },
        });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteReservationByClassIdById = deleteReservationByClassIdById;
