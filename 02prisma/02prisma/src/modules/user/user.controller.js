import * as userService from "./user.service.js";
import bcrypt from "bcrypt"; 

export const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, password) are required",
      });
    }


    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This Email Already Used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
      },
    });


    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};