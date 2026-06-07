import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    { title: String, completed: { type: Boolean, default: false } },
    { timestamps: true }
);

export const TodoModel = model("Todo", todoSchema);