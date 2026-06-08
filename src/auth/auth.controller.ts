import { Request, Response } from "express";
import { getUserByEmail, createUser } from "../user/user.service.ts";
import { RegisterDto } from "./schema/register.schema.ts";
import { LoginDto } from "./schema/login.schema.ts";
import bcrypt from "bcrypt";


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body ?? {} as LoginDto;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body ?? {} as RegisterDto;
        const user = await createUser({ email, password });
        res.status(201).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};