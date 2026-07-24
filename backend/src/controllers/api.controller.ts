import type { AuthenticatedRequest } from "../types/authTypes.js";
import type { Response, Request } from "express";
import { searchSchema } from "../schemas/api-schema.js";

const baseUrl = process.env.FINNHUB_API_BASE_URL;
const apiKey = process.env.API_KEY;

export const getTickersApi = async (req: AuthenticatedRequest, res: Response) => {

    const validation = searchSchema.safeParse(req.query);

    if (!validation.success) {
        const { fieldErrors, formErrors } = validation.error.flatten();
        return res.status(400).json({ message: "Validation failed", fieldErrors, formErrors });
    }

    const search = validation.data.q;

    if (!apiKey) {
        throw Error("API_KEY is missing");
    }
    
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const params = new URLSearchParams({
        q: search,
        exchange: 'US',
        token: apiKey,
    })

    try {

        const response = await fetch(`${baseUrl}/search?${params.toString()}`,);

        if (!response.ok) {
            throw Error("Failed to fetch API");
        }

        const data = await response.json();

        return res.status(200).json({ tickers: data });

    } catch (err) {
        return res.status(500).json({ error: "Error getting tickers: " + err });
    }
}