import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.ts";
import { createTodoSchema } from "./schema/todo.schema.ts";
import { getTodos, createTodo, getTodoById } from "./todo.controller.ts";

export const todoRouter = Router();

todoRouter.get("/", getTodos);

todoRouter.post("/", validate(createTodoSchema), createTodo);

todoRouter.get("/:id", getTodoById);    