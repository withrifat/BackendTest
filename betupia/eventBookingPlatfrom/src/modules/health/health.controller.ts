import { Request, Response } from 'express';
import os from 'os';

const checkHealth = (req: Request, res: Response) => {
  const toMB = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

  const uptimeSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  const memoryUsage = process.memoryUsage();
  const cpus = os.cpus();

  res.status(200).json({
    status: 'OK',
    message: 'Server is healthy and running smoothly! 🚀',
    timestamp: new Date().toISOString(),
    app: {
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      processId: process.pid,
      uptime: `${hours}h ${minutes}m ${seconds}s`,
    },
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      osType: os.type(),
      architecture: os.arch(),
      cpuModel: cpus[0]?.model || 'Unknown',
      cpuCores: cpus.length,
      loadAverage: os.loadavg(),
    },
    memory: {
      systemTotal: toMB(os.totalmem()),
      systemFree: toMB(os.freemem()),
      processRss: toMB(memoryUsage.rss),
      heapUsed: toMB(memoryUsage.heapUsed),
      heapTotal: toMB(memoryUsage.heapTotal),
    },
    funStuff: {
      yourIp: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      serverMood: os.freemem() > 500 * 1024 * 1024 ? 'Energetic ⚡' : 'A bit tired 🥱',
      coffeeStatus: '418 - Always ready for coffee ☕',
    },
  });
};

export const HealthController = {
  checkHealth,
};
