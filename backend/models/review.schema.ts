import mongoose, { InferSchemaType } from "mongoose";

export const reviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdBy: {
    id: String,
    name: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export type IReview = InferSchemaType<typeof reviewSchema>;
