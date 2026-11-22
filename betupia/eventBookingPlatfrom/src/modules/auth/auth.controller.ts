import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";
import { prisma } from "../../config/prisma.js";
import { AuthRequest } from "../../middleware/auth.middleware.js";

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

export const login = async (req: Request, res: Response) => {
  try {
    // 01. simple validation
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password is required",
      });
    }

    // 02: database check is account is accociated
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account is not accociated with email ",
      });
    }
    // 03: password check
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(400).json({
        success: false,
        message: "Password mismatched!",
      });
    }

    // 04: account status check
    const isActive = user.status;

    if (!isActive) {
      return res.status(400).json({
        success: false,
        message: "Account is not active!",
      });
    }

    // 05: generate a token using jsonwebtoken
    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      },
    );
    // 06: return the actual response
    const { password: _hidden, ...rest } = user;

    return res.status(200).json({
      success: true,
      data: {
        ...rest,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    // 01: Grab the user id
    const { user } = req;

    if (!user?.id) {
      return res.status(400).json({
        success: false,
        message: "UserId not found",
      });
    }

    // 02: pick the data from db
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "user data not found",
      });
    }

    const { password: _hidden, ...rest } = userData;

    // 03: send response
    return res.status(200).json({
      success: true,
      data: { ...rest },
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
