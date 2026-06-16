import { Types } from "mongoose";
import { TodoModel } from "./model/todo.model.ts";
import { CreateTodoDto, UpdateTodoDto } from "./schema/todo.schema.ts";

const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getTodos = async (userId: string) => {
    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
    return todos;
};

export const createTodo = async (userId: string, createTodoDto: CreateTodoDto) => {
    const todo = await TodoModel.create({ ...createTodoDto, userId });
    return todo;
};

export const getTodoById = async (userId: string, id: string) => {
    if (!isValidObjectId(id)) {
        return null;
    }
    const todo = await TodoModel.findOne({ _id: id, userId });
    return todo;
};

export const updateTodo = async (userId: string, id: string, updateTodoDto: UpdateTodoDto) => {
    if (!isValidObjectId(id)) {
        return null;
    }
    const todo = await TodoModel.findOneAndUpdate({ _id: id, userId }, updateTodoDto, { new: true });
    return todo;
};

export const deleteTodo = async (userId: string, id: string) => {
    if (!isValidObjectId(id)) {
        return null;
    }
    const todo = await TodoModel.findOneAndDelete({ _id: id, userId });
    return todo;
};