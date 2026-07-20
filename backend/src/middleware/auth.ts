import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";
import type { AuthenticatedRequest } from "../types/authTypes.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : undefined;

  if (!token) {

    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      iat?: number;
      exp?: number;
    };

    const authUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = {
      id: decoded.userId,
    };


    return next();
  
  } catch (err: any) {

    return res.status(401).json({ error: "Invalid or expired token" });
  }
};