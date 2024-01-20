import { z } from "zod"

export function record<Table extends string = string>(table?: Table) {
    return z.custom<`${Table}:${string}`>(
        (val) =>
            typeof val === 'string' && table
                ? val.startsWith(table + ':')
                : true,
        {
            message: ['Must be a record', table && `Table must be: "${table}"`]
                .filter((a) => a)
                .join('; '),
        }
    );
}

export const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "Add a descriptive title"),
    description: z.string().optional(),
    status: z.enum(["todo", "inprogress", "canceled", "done"], {
        required_error: "You need to select a status.",
    }),
    label: z.enum(["bug", "feature", "documentation"], {
        required_error: "You need to select a label.",
    }),
    priority: z.enum(["high", "low", "moderate"], {
        required_error: "You need to set the priority.",
    }),
    author: record('user'),
})

export type Task = z.infer<typeof taskSchema>
