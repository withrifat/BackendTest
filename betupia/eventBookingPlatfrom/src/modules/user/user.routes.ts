import { Router } from "express";
import { getUsersController } from "./user.controller.js";

const router = Router();

router.get("/", getUsersController);

export const userRoutes = router;