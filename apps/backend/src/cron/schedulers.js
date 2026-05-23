import cron from 'node-cron';

export function runSchedulers(io, prisma) {
  cron.schedule('*/2 * * * *', async () => {
    const regions = await prisma.region.findMany();
    for (const region of regions) {
      const latencyMs = Math.max(8, Math.round(region.latencyMs + (Math.random() * 6 - 3)) || 12);
      const packetLoss = Number(Math.max(0, Math.random() * 1.2).toFixed(2));
      const cpuUsage = Number((20 + Math.random() * 60).toFixed(2));
      const ramUsage = Number((20 + Math.random() * 65).toFixed(2));
      const trafficLoad = Number((10 + Math.random() * 85).toFixed(2));
      await prisma.region.update({ where: { id: region.id }, data: { latencyMs, packetLoss, cpuUsage, ramUsage, trafficLoad, lastChecked: new Date() } });
      await prisma.pingHistory.create({ data: { regionId: region.id, latencyMs, packetLoss, uptime: 99.9, trafficLoad, cpuUsage, ramUsage } });
    }
    const stats = await prisma.publicStats.findUnique({ where: { id: 1 } });
    io.emit('public_stats_updated', stats);
    io.emit('region_ping_updated', await prisma.region.findMany());
  });
}
