import mongoose, { InferSchemaType, model } from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
);

export type IUser = InferSchemaType<typeof schema>;

export default model<IUser>("user", schema);
