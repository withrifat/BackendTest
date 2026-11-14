import {BookService} from "./book.service.js";
import catchAsync from "../../utils/catchAsync.js";
import {StatusCodes} from "http-status-codes";

const createBook = catchAsync(async (req, res)=>{
    const book = await BookService.createBook(req.body);

    res.status(StatusCodes.CREATED).json({
        success : true,
        message: "Book Created Successfully",
        data: book,
    })
})


export const BookController = {
    createBook,

}