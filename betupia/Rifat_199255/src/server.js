
import "./config/env.js";
import app from "./app.js";
import prisma from "./lib/prisma.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

    const shutdown = async () => {
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Server startup failed:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
