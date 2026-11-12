import express from "express";
import { AuthorController } from "./author.controller.js";

const router = express.Router();

router.get("/", AuthorController.getAllAuthors);
router.post("/", AuthorController.createAuthor);

export default router;