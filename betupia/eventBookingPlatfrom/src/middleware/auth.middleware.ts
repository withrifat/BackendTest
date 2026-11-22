import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { prisma } from "../config/prisma.js"; // Adjust path to your Prisma client instance
import { Role } from "../generated/prisma/client.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: Role;
}

export const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    // 2. Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Invalid token format" });
      return;
    }

    // 3. Verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as CustomJwtPayload;

    // 4. Fetch the user from Prisma to ensure they still exist and have an active status
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User no longer exists" });
      return;
    }

    if (user.status !== "active") {
      res.status(403).json({ message: "Forbidden: Account is not active" });
      return;
    }

    // 5. Attach fresh database values to req.user
    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
