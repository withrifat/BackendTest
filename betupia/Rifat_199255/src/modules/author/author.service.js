import prisma from "../../lib/prisma.js";

const createAuthor = async(payload) =>{
    const author = await prisma.author.create({
        data : payload,
    });
    return author;
}

export const getAllAuthors = async () => {
  return await prisma.author.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const AuthorService = {
    createAuthor,
    getAllAuthors,
    
}