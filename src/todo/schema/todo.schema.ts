import { z } from "zod/v3";

export const createTodoSchema = z.object({
    title: z.string().min(10),
    completed: z.boolean().optional().default(false),
});


export type CreateTodoDto = z.infer<typeof createTodoSchema>;