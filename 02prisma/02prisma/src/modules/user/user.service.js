import prisma from "../../lib/prisma.js"; 
import bcrypt from "bcrypt";


export const createUserIntoDB = async (payload) => {
  const { password, ...rest } = payload;
  

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  return result;
};

export const findUserByEmail = async (email) => {
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result;
};