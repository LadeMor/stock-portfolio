import { Router } from "express";
import {
    getMe,
    register,
    login
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/me", getMe);

router.post("/register", register); 
router.post("/login", login); 

export default router;