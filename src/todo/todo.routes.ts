import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.ts";
import { authenticate } from "../middlewares/authentication.middleware.ts";
import { createTodoSchema, updateTodoSchema } from "./schema/todo.schema.ts";
import { getTodos, createTodo, getTodoById, updateTodo, deleteTodo } from "./todo.controller.ts";

export const todoRouter = Router();

todoRouter.use(authenticate);

todoRouter.get("/", getTodos);
todoRouter.post("/", validate(createTodoSchema), createTodo);
todoRouter.get("/:id", getTodoById);
todoRouter.patch("/:id", validate(updateTodoSchema), updateTodo);
todoRouter.delete("/:id", deleteTodo);
