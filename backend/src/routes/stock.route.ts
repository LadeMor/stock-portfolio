import { Router } from "express";
import { getMyStocks, createStock } from "../controllers/stock.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/", isAuthenticated, getMyStocks);

router.post("/", isAuthenticated, createStock);

export default router;