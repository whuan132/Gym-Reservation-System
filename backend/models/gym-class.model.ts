import mongoose, { InferSchemaType, model } from "mongoose";

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  date: { type: Date, required: true },
  trainers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
  reviews: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
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
