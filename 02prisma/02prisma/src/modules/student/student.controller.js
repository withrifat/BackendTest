import { StatusCodes } from "http-status-codes";
import * as studentService from "./student.service.js";

export const createStudent = async (req, res) => {
  const student = await studentService.createStudent(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
};

export const getStudents = async (req, res) => {
  const students = await studentService.getStudents();

  res.status(StatusCodes.OK).json({
    success: true,
    data: students,
  });
};

export const getStudentById = async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: student,
  });
};

export const updateStudent = async (req, res) => {
  const student = await studentService.updateStudent(
    req.params.id,
    req.body
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};

export const deleteStudent = async (req, res) => {
  await studentService.deleteStudent(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Student deleted successfully",
  });
};