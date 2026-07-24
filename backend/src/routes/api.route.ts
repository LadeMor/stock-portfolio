import { Router } from "express";
import { getTickersApi } from "../controllers/api.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/tickers", isAuthenticated, getTickersApi);

export default router;