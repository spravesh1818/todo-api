import { TodoModel } from "./model/todo.model.ts";
import { CreateTodoDto } from "./schema/todo.schema.ts";

export const getTodos = async () => {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    return todos;
};

export const createTodo = async (createTodoDto: CreateTodoDto) => {
    const todo = await TodoModel.create(createTodoDto);
    return todo;
};

export const getTodoById = async (id: string) => {
    const todo = await TodoModel.findById(id);
    return todo;
};

