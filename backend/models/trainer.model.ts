import mongoose, { InferSchemaType, model } from "mongoose";
import { reviewSchema } from "./review.schema";

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  specialization: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  reviews: [reviewSchema],
});

export type ITrainer = InferSchemaType<typeof schema>;

export default model<ITrainer>("trainer", schema);
