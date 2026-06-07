import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { connectDB } from "./config/db.ts";
import { todoRouter } from "./todo/todo.routes.ts";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/todos", todoRouter);

app.get("/", (_req: Request, res: Response) => res.json({ message: "hello from todo-api" }));
app.get("/health", (_req: Request, res: Response) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("listening on http://localhost:3000"));