"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const review_schema_1 = require("./review.schema");
const reservation_schema_1 = require("./reservation.schema");
const schema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    rating: { type: Number, default: 5.0 },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, required: true },
    trainers: [
        {
            _id: mongoose_1.default.Schema.Types.ObjectId,
            name: String,
        },
    ],
    reviews: [review_schema_1.reviewSchema],
    reservations: [reservation_schema_1.reservationSchema],
});
exports.default = (0, mongoose_1.model)("gym_class", schema);
