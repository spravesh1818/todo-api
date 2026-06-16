import { z } from "zod/v3";

export const createTodoSchema = z.object({
    title: z.string().min(1),
    completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
    title: z.string().min(1).optional(),
    completed: z.boolean().optional(),
}).refine(data => data.title !== undefined || data.completed !== undefined, {
    message: "At least one field required",
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
