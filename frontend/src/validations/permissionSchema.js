import * as z from "zod";

export const permissionSchema = z.object({

    module: z
        .string()
        .trim()
        .min(2, "Le module est obligatoire."),

    resource: z
        .string()
        .trim()
        .min(2, "La ressource est obligatoire."),

    action: z
        .string()
        .trim()
        .min(2, "L'action est obligatoire."),

    description: z
        .string()
        .optional(),

    is_active: z.boolean(),

});