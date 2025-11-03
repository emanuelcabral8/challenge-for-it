import { z } from "zod";
export const taskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});

export type TTaskForm = z.infer<typeof taskSchema>;
export const taskSchemaRequired = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
});
export type TTaskFormRequired = z.infer<typeof taskSchemaRequired>;
