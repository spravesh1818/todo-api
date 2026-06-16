import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        title: String,
        completed: { type: Boolean, default: false },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    },
    { timestamps: true }
);

export const TodoModel = model("Todo", todoSchema);
