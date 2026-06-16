import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.utils.ts";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.slice(7);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { userId: decoded.userId };
    next();
};
