import { AuthorService } from "./author.service.js";
import catchAsync from "../../utils/catchAsync.js";
import prisma from "../../lib/prisma.js";
import { StatusCodes } from "http-status-codes";

const createAuthor = catchAsync(async (req, res) => {
  const author = await AuthorService.createAuthor(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Author Created Successfully",
    data: author,
  });
});
const getAllAuthors = catchAsync(async (req, res) =>{
    const authors = await AuthorService.getAllAuthors();

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Author Fetched Successfully",
        data : authors ,
    })
})
export const AuthorController = {
    createAuthor,
    getAllAuthors,
    
}