import { Router } from "express";
import {
    getMe,
    register,
    login
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get("/me", isAuthenticated, getMe);

router.post("/register", register); 
router.post("/login", login); 

export default router;