import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.ts";
import { login, register } from "./auth.controller.ts";
import { loginSchema } from "./schema/login.schema.ts";
import { registerSchema } from "./schema/register.schema.ts";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), login);

authRouter.post("/register", validate(registerSchema), register);
