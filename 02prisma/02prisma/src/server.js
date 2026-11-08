import app from './app.js';
import prisma from './lib/prisma.js';
import { env } from './config/env.js';

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log('Database connected successfully');

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
