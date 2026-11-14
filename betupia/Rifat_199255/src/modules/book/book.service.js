import prisma from "../../lib/prisma.js";

const createBook = async (payload)=>{
    return await prisma.book.create({
        data: payload,
    })
}

export const BookService ={
    createBook,

}