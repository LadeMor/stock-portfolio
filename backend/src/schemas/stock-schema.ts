import { z } from "zod";

export const createStockSchema = z.object({
    ticker: z
        .string()
        .trim()
        .min(1, 'Ticker is required')
        .max(10, 'Ticker is too long')
        .transform((value) => value.toUpperCase()),

    quantity: z
        .number()
        .positive('Quantity must be greater than zero')
        .max(1_000_000, 'Quantity is too large'),

    purchasePrice: z
        .number()
        .positive('Purchase price must be greater than zero')
        .max(1_000_000, 'Purchase price is too large'),
})

export const deleteStockSchema = z.object({
    id: z.uuid()
})