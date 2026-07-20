import type { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client.js";
import type { AuthenticatedRequest } from "../types/authTypes.js";
import { registerSchema, loginSchema } from "../schemas/auth-schema.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            email: true,
        },
    });

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    return res.status(200).json({ user });
};

export const register = async (req: Request, res: Response): Promise<Response> => {

    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
        const { fieldErrors, formErrors } = validation.error.flatten();
        return res.status(400).json({ message: "Validation failed", fieldErrors, formErrors });
    }

    const userEmail = validation.data.email;
    const password = validation.data.password;

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
        })

        if (user) return res.status(400).json({ error: "Email is not eligible for registration" });

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email: userEmail,
                passwordHash: hashedPassword,
            },
            select: {
                id: true
            }
        });

        return res.status(201).json({ id: newUser.id })

    } catch (err) {
        return res.status(500).json({ error: "Registartions error: " + err });
    }

}

export const login = async (req: Request, res: Response): Promise<Response> => {

    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        const { fieldErrors, formErrors } = validation.error.flatten();
        return res.status(400).json({ message: "Validation failed", fieldErrors, formErrors });
    }

    const data = validation.data;

    try {

        const user = await prisma.user.findUnique({
            where:{
                email: data.email.trim()
            }
        })

        if(!user) return res.status(401).json({ error: "Invalid email or password" });

        const ok = await comparePassword(data.password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: "Invalid email or password" });

        const token = generateToken(user.id);

        return res.json({ token });

    } catch (err) {
        return res.status(500).json({ error: "Login error: " + err });
    }

}