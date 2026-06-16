
import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "./schema/todo.schema.ts";
import {
    getTodos as getTodosService,
    createTodo as createTodoService,
    getTodoById as getTodoByIdService,
    updateTodo as updateTodoService,
    deleteTodo as deleteTodoService,
} from "./todo.service.ts";
import { getCache, setCache, deleteCache } from "../cache/cache.service.ts";

const CACHE_TTL = 300;

const cacheKey = (userId: string) => `todos:${userId}`;

export const getTodos = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const key = cacheKey(userId);

        const cachedTodos = await getCache(key);
        if (cachedTodos) {
            return res.json(cachedTodos);
        }

        const todos = await getTodosService(userId);
        await setCache(key, todos, CACHE_TTL);
        return res.json(todos);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const { title, completed } = req.body ?? {} as CreateTodoDto;
        const todo = await createTodoService(userId, { title, completed: completed ?? false });
        await deleteCache(cacheKey(userId));
        res.status(201).json(todo);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const todo = await getTodoByIdService(userId, req.params.id as string);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(todo);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const todo = await updateTodoService(userId, req.params.id as string, req.body as UpdateTodoDto);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        await deleteCache(cacheKey(userId));
        res.json(todo);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        const todo = await deleteTodoService(userId, req.params.id as string);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        await deleteCache(cacheKey(userId));
        res.status(204).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
