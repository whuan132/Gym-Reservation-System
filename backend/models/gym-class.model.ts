import mongoose, { InferSchemaType, model } from "mongoose";
import { reviewSchema } from "./review.schema";

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  rating: { type: Number, default: 5.0 },
  startDate: { type: Date, default: Date.now() },
  endDate: { type: Date, required: true },
  trainers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
  reviews: [reviewSchema],
  reservations: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
});

export type IGymClass = InferSchemaType<typeof schema>;

export default model<IGymClass>("gym_class", schema);
