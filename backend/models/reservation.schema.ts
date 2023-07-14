import mongoose, { InferSchemaType } from "mongoose";

export const reservationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export type IReservation = InferSchemaType<typeof reservationSchema>;
