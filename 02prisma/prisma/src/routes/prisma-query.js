import {Router} from "express";
import prisma from "../lib/prisma.js";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/students', async(req , res)=>{
    try{
        const students = await prisma.student.findMany();

        return res.status(200).json({
            status: true,
            message: "Students Fetch Successfully ",
            data: students ,
        })
    }catch{
        return res.status(500).json({
            status: false,
            message: "Failed to fetch students"
        });
    }
})

router.post('/students', async(req, res)=>{
    try{
        const {name, email, phone} = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                status : false,
                message : "Name Email And Phone Number Are Required !"
            })
        };

        const newStudents = await prisma.student.create({
            data: {
                name,
                email,
                phone
            }
        })

        return res.status(StatusCodes.ACCEPTED).json({
            status : true,
            message: "Student Created Successfully",
            data : newStudents
        })
    }
    catch{
        return res.status(StatusCodes.FAILED_DEPENDENCY).json({
            status :false,
            message: "Something Went Wrong!"
        })
    }
})
router.put('/students/:id', async (req, res) => {
try{
    const {id} = req.params;
    const {name, email, phone} = req.body;
    const updatedStudents = await prisma.student.update({
        where: {id},
        data: {
            name,
            email,
            phone
        }
    })

    return res.status(StatusCodes.ACCEPTED).json({
        status : true,
        message: `Students update Successfully `,
        data: updatedStudents,
    })
}catch(error){
    return res.status(StatusCodes.CONFLICT).json({
        status : false,
        message: "Failed to update Students",
        error: error.message
    })
}
})

router.delete('/students/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        await prisma.student.delete({
            where: {id}
        })
        return res.status(StatusCodes.OK).json({
            status: true,
            message: `${id} data Deleted Successfully`,
        })
    } catch (error) {
        return res.status(StatusCodes.delete).json({
            status: false,
            message: "Request Failed !",
            data: error.message
        })
    }
})

export default router; 