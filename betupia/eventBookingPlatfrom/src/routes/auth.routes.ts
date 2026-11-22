import { Router } from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { login, me, register } from "../modules/auth/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyAuth, me);

export default router;
