import prisma from "../../lib/prisma.js";

const createBook = async (payload)=>{
    return await prisma.book.create({
        data: payload,
    })
}
const getAllBooks = async()=>{
    return await prisma.book.findMany({
        orderBy:{
            createdAt: 'desc',
        }
    })
    
}
export const BookService ={
    createBook,

}