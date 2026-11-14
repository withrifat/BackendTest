import express from "express";
import {BookController} from "./book.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import {updateBookValidationSchema, createBookValidationSchema} from "./book.validation.js";

const router = express.Router();

router.post("/", validate(createBookValidationSchema, "body"), BookController.createBook);


export default router;