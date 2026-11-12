import { AuthorService } from "./author.service.js";
import catchAsync from "../../utils/catchAsync.js";
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
const getAuthorById = catchAsync(async(req, res)=>{
    const authorId = req.params.id;
    const author = await AuthorService.getAuthorById(authorId);
    res.status(StatusCodes.OK).json({
        success : true,
        message: "Author Fetched Successfully",
        data : author,
    })
})
const patchAuthor = catchAsync(async(req, res)=>{
    const authorId = req.params.id;
    const updateData = req.body;

    const newAuthor = await AuthorService.patchAuthor(authorId,updateData);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Author Patch Successfully",
        data: newAuthor,
    })
})
const deleteAuthor = catchAsync(async(req, res)=>{
    const authorId = req.params.id;

    const deleteAuthor = await AuthorService.deleteAuthor(authorId);
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Author delete Successfully",
        data: deleteAuthor,
    })

})
export const AuthorController = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    patchAuthor,
    deleteAuthor
    
}