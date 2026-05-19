import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const providers = ['DigitalOcean','Vultr','Linode/Akamai','AWS','Google Cloud','Microsoft Azure','Oracle Cloud','Hetzner','OVH','Contabo','Alibaba Cloud','Tencent Cloud','IBM Cloud','UpCloud','Kamatera','Scaleway','Leaseweb','Exoscale','CloudSigma','LightNode','GreenCloud VPS','Sakura Cloud','Biznet Gio','IDCloudHost','RackNerd','InterServer','Hostinger VPS','Namecheap VPS','Atlantic.Net'];
const regions = ['Singapore','Jakarta','Batam','Tokyo','Osaka','Seoul','Hongkong','Frankfurt','London','Amsterdam','Paris','New York','Los Angeles','Dallas','Miami','Mumbai','Sydney','Toronto','Sao Paulo','Dubai'];

async function main() {
  await prisma.publicStats.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const adminPass = await bcrypt.hash('Admin#Neocloud2026', 10);
  await prisma.user.upsert({ where: { email: 'admin@neocloud.id' }, update: {}, create: { email: 'admin@neocloud.id', password: adminPass, name: 'Super Admin', role: 'admin' } });

  for (const name of providers) {
    await prisma.provider.upsert({ where: { name }, update: {}, create: { name, startingPrice: 50000, regionIds: [], reputation: 'Global', strengths: 'High reliability', recommendation: 'Production workload' } });
  }

  for (const name of regions) {
    await prisma.region.upsert({ where: { name }, update: {}, create: { name, countryCode: name.slice(0,2).toUpperCase(), targetHost: `${name.toLowerCase().replace(/ /g,'-')}.example.net`, activeNode: 3 } });
  }

  const legal = ['terms-of-service','privacy-policy','cookie-policy','refund-policy','vps-abuse-policy','anti-spam-policy','dmca-policy','suspended-policy'];
  for (const slug of legal) {
    await prisma.legalPage.upsert({ where: { slug }, update: {}, create: { slug, title: slug.replace(/-/g,' ').toUpperCase(), content: `Konten legal profesional untuk ${slug}.` } });
  }
}

main().finally(() => prisma.$disconnect());
