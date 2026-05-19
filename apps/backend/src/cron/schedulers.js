import cron from 'node-cron';
export function runSchedulers(io, prisma) {
  cron.schedule('*/2 * * * *', async () => {
    const stats = await prisma.publicStats.findUnique({ where: { id: 1 } });
    io.emit('public_stats_updated', stats);
  });
}
