import { Router } from "express";

import * as studentController from "./student.controller.js";

import validate from "../../middlewares/validate.middleware.js";

import {
  createStudentSchema,
  updateStudentSchema,
} from "./student.validation.js";

const router = Router();

router.post(
  "/",
  validate(createStudentSchema),
  studentController.createStudent
);

router.get("/", studentController.getStudents);

router.get("/:id", studentController.getStudentById);

router.put(
  "/:id",
  validate(updateStudentSchema),
  studentController.updateStudent
);

router.delete("/:id", studentController.deleteStudent);

export default router;