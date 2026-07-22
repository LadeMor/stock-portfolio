import { prisma } from "../prisma/client.js";
import type { AuthenticatedRequest } from "../types/authTypes.js";
import type { Response } from "express";
import { createStockSchema } from "../schemas/stock-schema.js";

export const getMyStocks = async (req: AuthenticatedRequest, res: Response) => {

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    try {
        const stocks = await prisma.stock.findMany({
            where: {
                userId: req.user.id
            },
            select: {
                ticker: true,
                quantity: true,
                purchasePrice: true,
                createdAt: true
            }
        })

        return res.status(200).json({ stocks });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error getting stocks: " + err });
    }
}

export const createStock = async (req: AuthenticatedRequest, res: Response) => {

    const validation = createStockSchema.safeParse(req.body);

    if (!validation.success) {
        const { fieldErrors, formErrors } = validation.error.flatten();
        return res.status(400).json({ message: "Validation failed", fieldErrors, formErrors });
    }

    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized',
        })
    }

    try {

        const newStock = await prisma.stock.create({
            data: {
                userId: req.user.id,
                ticker: validation.data.ticker,
                quantity: validation.data.quantity,
                purchasePrice: validation.data.purchasePrice
            },
            select:{
                id: true
            }
        })

        return res.status(201).json({stockId: newStock.id});

    } catch (err) {
        return res.status(500).json({ error: "Error creating stock: " + err });
    }

}