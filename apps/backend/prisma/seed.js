import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.publicStats.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const adminPass = await bcrypt.hash('Admin#Neocloud2026', 10);
  await prisma.user.upsert({
    where: { email: 'admin@neocloud.id' },
    update: {},
    create: { email: 'admin@neocloud.id', password: adminPass, name: 'Super Admin', role: 'admin' }
  });
}
main().finally(() => prisma.$disconnect());
