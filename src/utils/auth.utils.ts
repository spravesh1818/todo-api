import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        return decoded;
    } catch {
        return null;
    }
}
