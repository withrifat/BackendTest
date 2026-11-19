import app from "./app.js";
import { ENV } from "./config/env.js";
import { prisma } from "./config/prisma.js";

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log("Connected to MongoDB via Prisma");

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

bootstrap();
