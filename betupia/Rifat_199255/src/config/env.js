import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in the environment or .env file");
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};
