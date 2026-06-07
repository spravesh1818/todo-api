
import { Request, Response } from "express";
import { CreateTodoDto } from "./schema/todo.schema.ts";
import { getTodos as getTodosService, createTodo as createTodoService, getTodoById as getTodoByIdService } from "./todo.service.ts";

export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await getTodosService();
        res.json(todos);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        let { title } = req.body ?? {} as CreateTodoDto;
        const todo = await createTodoService({ title, completed: false });
        res.status(201).json(todo);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const todo = await getTodoByIdService(req.params.id as string);
        res.json(todo);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};