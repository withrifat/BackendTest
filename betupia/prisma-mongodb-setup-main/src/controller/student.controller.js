import prisma from "../lib/prisma.js"



export const student = async (req, res) => {
   try{

      const students = await prisma.student.findMany();

      return res.status(200).json({
        message: "student fetch successfully",
        data: students
      })
   }
   catch(error){
    res.status(500).json({
        status:false,
        message: `Please solve the error ${error}`
    })
   }
};



export const addStudent = async (req, res) => {

    try{

        const { name, email, phone } = req.body

        if(!email){
            return res.status(400).json({
                status: false,
                message: "Email must required"
            })
        }


        const existingStudent = await prisma.student.findUnique({
            where: {email}
        })


        if(existingStudent){
            return res.status(200).json({
                status: false,
                message: "This email already exist"
            })
        }

        const student = await prisma.student.create({
            data:{
                name,
                email,
                phone
            }
        });

        return res.status(201).json({
            status: true,
            message: "Student create successfully",
            data: student
        })



    }
    catch(error){

        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
