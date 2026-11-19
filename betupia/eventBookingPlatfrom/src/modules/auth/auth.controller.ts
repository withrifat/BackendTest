import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";

export const register = async (req: Request, res: Response) => {
  try {
    // 01. body theke data nibo
    const { firstName, lastName, email, password, phone, designation } =
      req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "firstName, lastName, email, password and phone number are required",
      });
    }

    // 02: email and phone use kore check dibo je user ta already exist kore kina
    const exist = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email of Phone already registered",
      });
    }

    // 03: Hash the password, then sae the user (role by default "user")
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: hashedPassword,
        designation: designation,
      },
    });

    const { password: _hidden, ...restUserDetails } = user;

    // 04: Return Full Response except password
    return res.status(201).json({
      success: true,
      message: "Your account is created successfully ✅",
      data: restUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
