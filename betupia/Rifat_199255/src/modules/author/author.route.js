import express from "express";
import { AuthorController } from "./author.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createAuthorSchema, authorIdSchema, updateAuthorSchema } from "./author.validation.js";

const router = express.Router();

router.get("/", AuthorController.getAllAuthors);
router.get("/:id", validate(authorIdSchema, "params"), AuthorController.getAuthorById);
router.post("/", validate(createAuthorSchema, "body"), AuthorController.createAuthor);
router.patch("/:id", validate(authorIdSchema, "params"), validate(updateAuthorSchema, "body"), AuthorController.patchAuthor);
router.delete("/:id", validate(authorIdSchema, "params"), AuthorController.deleteAuthor);

export default router;