import prisma from "../../lib/prisma.js";

export const createStudent = async (data) => {
  return prisma.student.create({ data });
};

export const getStudents = async () => {
  return prisma.student.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStudentById = async (id) => {
  return prisma.student.findUnique({
    where: { id },
  });
};

export const updateStudent = async (id, data) => {
  return prisma.student.update({
    where: { id },
    data,
  });
};

export const deleteStudent = async (id) => {
  return prisma.student.delete({
    where: { id },
  });
};