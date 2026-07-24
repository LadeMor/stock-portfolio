import { Router } from "express";
import { getMyStocks, createStock, deleteStock } from "../controllers/stock.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/", isAuthenticated, getMyStocks);

router.post("/", isAuthenticated, createStock);

router.delete("/:id", isAuthenticated, deleteStock);

export default router;