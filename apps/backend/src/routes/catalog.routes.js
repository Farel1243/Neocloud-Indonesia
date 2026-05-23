import { Router } from 'express';
import { prisma } from '../server.js';

const r = Router();

r.get('/products', async (_req, res) => res.json(await prisma.product.findMany({ where: { active: true } })));
r.get('/providers', async (_req, res) => res.json(await prisma.provider.findMany()));
r.get('/regions', async (_req, res) => res.json(await prisma.region.findMany()));

export default r;
