import { Router } from "express";

import * as userController from "./user.controller.js";
import validate from "../../middlewares/validate.middleware.js";


const router = Router();

// router.post("/", userController.createUser);

router.post("/register", userController.registerUser);

// router.get("/", userController.getUsers);

// router.get("/:id", userController.getUserById);

// router.put("/:id", userController.updateUser);

// router.delete("/:id", userController.deleteUser);

export default router;