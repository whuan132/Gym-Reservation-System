import mongoose, { InferSchemaType, model } from "mongoose";

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  reviews: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export type ITrainer = InferSchemaType<typeof schema>;

export default model<ITrainer>("trainer", schema);
