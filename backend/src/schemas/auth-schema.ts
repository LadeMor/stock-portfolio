import { z } from 'zod';

export const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;

export const safePassword = z.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters")
    .refine(v => !CONTROL_CHARS.test(v), "Password contains invalid control characters");

export const registerSchema = z.object({
    email: z.string().trim().toLowerCase()
        .min(1, "Email is required")
        .max(254, "Email must be at most 254 characters long")
        .email("Invalid email format"),
    password: safePassword,
})

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase()
        .min(1, "Email is required")
        .max(254, "Email must be at most 254 characters long")
        .email("Invalid email format"),
    password: safePassword,
})