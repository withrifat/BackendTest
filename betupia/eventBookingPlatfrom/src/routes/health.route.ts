import { Router } from "express";
import { HealthController } from "../modules/health/health.controller.js";

const router = Router();

router.get("/", HealthController.checkHealth);

export const HealthRoutes = router;