import prisma from '../../lib/prisma.js';

const createAuthor = async (payload) => {
  const author = await prisma.author.create({
    data: payload,
  });
  return author;
};

const getAllAuthors = async () => {
  return await prisma.author.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const getAuthorById = async (id) => {
  const author = await prisma.author.findUnique({
    where: { id },
  });

  if (!author) {
    const error = new Error('Author Not Found');
    error.statusCode = 404;
    throw error;
  }

  return author;
};


const patchAuthor = async (id, payload) => {
  try {
    return await prisma.author.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFoundError = new Error("Author Not Found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
};


const deleteAuthor = async (id) => {
  try {
    return await prisma.author.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFoundError = new Error("Author Not Found");
      notFoundError.statusCode = 404;
      throw notFoundError;
    }
    throw error;
  }
};


export const AuthorService = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  patchAuthor,
  deleteAuthor,
};
