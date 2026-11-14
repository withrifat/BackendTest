import "dotenv/config";
import app from "./app.js";
import prisma from "./lib/prisma.config.js";

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
