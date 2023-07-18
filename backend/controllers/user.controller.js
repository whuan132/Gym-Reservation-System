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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const [page, page_size, query_key] = [
            parseInt(req.query.page || "1"),
            parseInt(req.query.page_size || "10"),
            req.query.query_key || "",
        ];
        const result = yield user_model_1.default
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
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.default
            .findOne({
            _id: req.params.user_id,
        }, { reviews: 0, __v: 0 })
            .lean();
        res.json({ success: true, data: result });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role } = req.body;
        const obj = {};
        if (name)
            obj.name = name;
        if (email)
            obj.email = email;
        if (role)
            obj.role = role;
        const result = yield user_model_1.default.updateOne({
            _id: req.params.user_id,
        }, { $set: obj });
        res.json({ success: true, data: result.modifiedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.default.deleteOne({
            _id: req.params.user_id,
        });
        res.json({ success: true, data: result.deletedCount });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserById = deleteUserById;
